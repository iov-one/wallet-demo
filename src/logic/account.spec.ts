import { Amount, BcpAccount } from "@iov/bcp-types";
import { MultiChainSigner } from "@iov/core";

import { sleep } from "../utils/timer";

import { getAccount, keyToAddress, sendTransaction, setName, watchAccount } from "./account";
import { addBlockchain } from "./connection";
import { createProfile, getMainIdentity } from "./profile";
import { faucetProfile, randomString, skipTests, testSpec, testTicker } from "./testhelpers";

describe("getAccount", () => {
  it("random account should be empty", async () => {
    if (skipTests()) {
      console.log("Skipping test");
      return;
    }
    const profile = await createProfile();
    const writer = new MultiChainSigner(profile);
    const reader = await addBlockchain(writer, testSpec);
    try {
      const acct = await getAccount(reader, getMainIdentity(profile));
      expect(acct).toEqual(undefined);
    } finally {
      reader.disconnect();
    }
  });

  it("faucet account should have tokens", async () => {
    if (skipTests()) {
      console.log("Skipping test");
      return;
    }
    const profile = await faucetProfile();
    const writer = new MultiChainSigner(profile);
    const reader = await addBlockchain(writer, testSpec);
    try {
      const acct = await getAccount(reader, getMainIdentity(profile));
      expect(acct).toBeTruthy();
      expect(acct!.name).toEqual("admin");
      expect(acct!.balance.length).toEqual(1);
      const token = acct!.balance[0];
      expect(token.tokenTicker).toEqual("CASH");
      expect(token.whole).toBeGreaterThan(1000000);
    } finally {
      reader.disconnect();
    }
  });
});

describe("sendTransaction", () => {
  it("moves token to new account", async () => {
    if (skipTests()) {
      console.log("Skipping test");
      return;
    }
    // default 2 seconds is not long enough when CI is under load
    // TODO
    // this.timeout(3500);

    const faucet = await faucetProfile();
    const empty = await createProfile();
    const rcpt = getMainIdentity(empty);

    const writer = new MultiChainSigner(faucet);
    const reader = await addBlockchain(writer, testSpec);
    try {
      // ensure rcpt is empty before
      const before = await getAccount(reader, rcpt);
      expect(before).toEqual(undefined);

      // send a token from the genesis account
      const amount: Amount = {
        whole: 12345,
        fractional: 678000,
        tokenTicker: testTicker,
      };
      const res = await sendTransaction(writer, reader.chainId(), keyToAddress(rcpt), amount, "hello");
      expect(res.metadata.height).toBeGreaterThan(2);
      expect(res.data.txid).toBeTruthy();

      // ensure the recipient is properly rewarded
      const after = await getAccount(reader, rcpt);
      expect(after).toBeTruthy();
      expect(after!.name).toEqual(undefined);
      expect(after!.balance.length).toEqual(1);
      const token = after!.balance[0];
      expect(token.tokenTicker).toEqual(amount.tokenTicker);
      expect(token.whole).toEqual(amount.whole);
      expect(token.fractional).toEqual(amount.fractional);
    } finally {
      reader.disconnect();
    }
  });
});

describe("setName", () => {
  it("sets a name on account with funds", async () => {
    if (skipTests()) {
      // TODO: better way to mark test as skipped???
      console.log("Skipping test");
      return;
    }
    // multiple transactions, so multiple blocks... let's give it some time
    // TODO: how to set timeout in jest??
    // this.timeout(4000);

    const faucet = await faucetProfile();
    const empty = await createProfile();
    const rcpt = getMainIdentity(empty);

    const writer = new MultiChainSigner(faucet);
    const reader = await addBlockchain(writer, testSpec);

    const rcptWriter = new MultiChainSigner(empty);
    const rcptReader = await addBlockchain(rcptWriter, testSpec);
    try {
      // send a token from the genesis account
      const amount: Amount = {
        whole: 10,
        fractional: 0,
        tokenTicker: testTicker,
      };
      await sendTransaction(writer, reader.chainId(), keyToAddress(rcpt), amount);

      // set the name - note we must sign with the recipient's writer
      const name = randomString(10);
      await setName(rcptWriter, rcptReader.chainId(), name);

      // ensure the recipient is properly named
      const after = await getAccount(reader, rcpt);
      expect(after).toBeTruthy();
      expect(after!.name).toEqual(name);
      expect(after!.balance.length).toEqual(1);
    } finally {
      reader.disconnect();
      rcptReader.disconnect();
    }
  });

  describe("watchAccount", () => {
    it("updates on all changes", async () => {
      if (skipTests()) {
        console.log("Skipping test");
        return;
      }
      // TODO
      // this.timeout(5000);

      const faucet = await faucetProfile();
      const empty = await createProfile();
      const rcpt = getMainIdentity(empty);

      const writer = new MultiChainSigner(faucet);
      const reader = await addBlockchain(writer, testSpec);

      const rcptWriter = new MultiChainSigner(empty);
      const rcptReader = await addBlockchain(rcptWriter, testSpec);
      try {
        let updatesFaucet = 0;
        let acctFaucet: BcpAccount | undefined;
        const unsubscribeFaucet = await watchAccount(reader, getMainIdentity(faucet), (acct?: BcpAccount) => {
          updatesFaucet++;
          acctFaucet = acct;
        });

        let updatesRcpt = 0;
        let acctRcpt: BcpAccount | undefined;
        const unsubscribeRcpt = await watchAccount(reader, rcpt, (acct?: BcpAccount) => {
          updatesRcpt++;
          acctRcpt = acct;
        });

        // validate update messages came
        await sleep(50);
        expect(updatesFaucet).toEqual(1);
        expect(acctFaucet).toBeTruthy();
        expect(acctFaucet!.name).toEqual("admin");
        expect(updatesRcpt).toEqual(1);
        expect(acctRcpt).toBe(undefined);

        // send a token from the genesis account
        const amount: Amount = {
          whole: 10,
          fractional: 0,
          tokenTicker: testTicker,
        };
        await sendTransaction(writer, reader.chainId(), keyToAddress(rcpt), amount);

        // validate update messages came
        await sleep(50);
        expect(updatesFaucet).toEqual(2);
        expect(acctFaucet).toBeTruthy();
        expect(acctFaucet!.name).toEqual("admin");
        expect(updatesRcpt).toEqual(2);
        expect(acctRcpt).toBeTruthy();
        expect(acctRcpt!.name).toBe(undefined);
        expect(acctRcpt!.balance.length).toEqual(1);
        const token = acctRcpt!.balance[0];
        expect(token.tokenTicker).toEqual(amount.tokenTicker);
        expect(token.whole).toEqual(amount.whole);

        // unsubscribe from one, only one update should come
        unsubscribeFaucet.unsubscribe();
        // send a second payment
        await sendTransaction(writer, reader.chainId(), keyToAddress(rcpt), amount);

        await sleep(50);
        // no more facuet updates should come
        expect(updatesFaucet).toEqual(2);
        expect(acctFaucet).toBeTruthy();
        expect(acctFaucet!.name).toEqual("admin");
        // rcpt should get one more callback
        expect(updatesRcpt).toEqual(3);
        expect(acctRcpt).toBeTruthy();
        expect(acctRcpt!.name).toBe(undefined);
        expect(acctRcpt!.balance.length).toEqual(1);
        const token2 = acctRcpt!.balance[0];
        expect(token2.tokenTicker).toEqual(amount.tokenTicker);
        expect(token2.whole).toEqual(amount.whole * 2);

        // end other subscription
        unsubscribeRcpt.unsubscribe();
      } finally {
        reader.disconnect();
        rcptReader.disconnect();
      }
    });
  });
});
