// tslint:disable:no-unused-expression
import { expect } from "chai";
import "mocha";

import { BcpAccount, FungibleToken } from "@iov/bcp-types";
import { IovWriter } from "@iov/core";

import { getAccount, keyToAddress, sendTransaction, setName, watchAccount } from "./account";
import { addBlockchain } from "./connection";
import { createProfile, getMainIdentity } from "./profile";
import { faucetProfile, randomString, skipTests, testSpec, testTicker } from "./testhelpers";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe("getAccount", () => {
  it("random account should be empty", async function(): Promise<void> {
    if (skipTests()) {
      this.skip();
      return;
    }
    const profile = await createProfile();
    const writer = new IovWriter(profile);
    const reader = await addBlockchain(writer, testSpec);
    try {
      const acct = await getAccount(reader, getMainIdentity(profile));
      expect(acct).to.equal(undefined);
    } finally {
      reader.disconnect();
    }
  });

  it("faucet account should have tokens", async function(): Promise<void> {
    if (skipTests()) {
      this.skip();
      return;
    }
    const profile = await faucetProfile();
    const writer = new IovWriter(profile);
    const reader = await addBlockchain(writer, testSpec);
    try {
      const acct = await getAccount(reader, getMainIdentity(profile));
      expect(acct).to.be.ok;
      expect(acct!.name).to.equal("admin");
      expect(acct!.balance.length).to.equal(1);
      const token = acct!.balance[0];
      expect(token.tokenTicker).to.equal("CASH");
      expect(token.whole).to.be.greaterThan(1000000);
    } finally {
      reader.disconnect();
    }
  });
});

describe("sendTransaction", () => {
  it("moves token to new account", async function(): Promise<void> {
    if (skipTests()) {
      this.skip();
      return;
    }
    const faucet = await faucetProfile();
    const empty = await createProfile();
    const rcpt = getMainIdentity(empty);

    const writer = new IovWriter(faucet);
    const reader = await addBlockchain(writer, testSpec);
    try {
      // ensure rcpt is empty before
      const before = await getAccount(reader, rcpt);
      expect(before).to.equal(undefined);

      // send a token from the genesis account
      const amount: FungibleToken = {
        whole: 12345,
        fractional: 678000,
        tokenTicker: testTicker,
      };
      const res = await sendTransaction(writer, reader.chainId(), keyToAddress(rcpt), amount, "hello");
      expect(res.metadata.height).to.be.greaterThan(2);
      expect(res.data.txid).to.be.ok;

      // ensure the recipient is properly rewarded
      const after = await getAccount(reader, rcpt);
      expect(after).to.be.ok;
      expect(after!.name).to.equal(undefined);
      expect(after!.balance.length).to.equal(1);
      const token = after!.balance[0];
      expect(token.tokenTicker).to.equal(amount.tokenTicker);
      expect(token.whole).to.equal(amount.whole);
      expect(token.fractional).to.equal(amount.fractional);
    } finally {
      reader.disconnect();
    }
  });
});

describe("setName", () => {
  it("sets a name on account with funds", async function(): Promise<void> {
    if (skipTests()) {
      this.skip();
      return;
    }
    // multiple transactions, so multiple blocks... let's give it some time
    this.timeout(4000);

    const faucet = await faucetProfile();
    const empty = await createProfile();
    const rcpt = getMainIdentity(empty);

    const writer = new IovWriter(faucet);
    const reader = await addBlockchain(writer, testSpec);

    const rcptWriter = new IovWriter(empty);
    const rcptReader = await addBlockchain(rcptWriter, testSpec);
    try {
      // send a token from the genesis account
      const amount: FungibleToken = {
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
      expect(after).to.be.ok;
      expect(after!.name).to.equal(name);
      expect(after!.balance.length).to.equal(1);
    } finally {
      reader.disconnect();
      rcptReader.disconnect();
    }
  });

  describe("watchAccount", () => {
    it("updates on all changes", async function(): Promise<void> {
      if (skipTests()) {
        this.skip();
        return;
      }
      // multiple transactions, so multiple blocks... let's give it some time
      this.timeout(5000);

      const faucet = await faucetProfile();
      const empty = await createProfile();
      const rcpt = getMainIdentity(empty);

      const writer = new IovWriter(faucet);
      const reader = await addBlockchain(writer, testSpec);

      const rcptWriter = new IovWriter(empty);
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
        expect(updatesFaucet).to.equal(1);
        expect(acctFaucet).to.be.ok;
        expect(acctFaucet!.name).to.equal("admin");
        expect(updatesRcpt).to.equal(1);
        expect(acctRcpt).to.be.undefined;

        // send a token from the genesis account
        const amount: FungibleToken = {
          whole: 10,
          fractional: 0,
          tokenTicker: testTicker,
        };
        await sendTransaction(writer, reader.chainId(), keyToAddress(rcpt), amount);

        // validate update messages came
        await sleep(50);
        expect(updatesFaucet).to.equal(2);
        expect(acctFaucet).to.be.ok;
        expect(acctFaucet!.name).to.equal("admin");
        expect(updatesRcpt).to.equal(2);
        expect(acctRcpt).to.be.ok;
        expect(acctRcpt!.name).to.be.undefined;
        expect(acctRcpt!.balance.length).to.equal(1);
        const token = acctRcpt!.balance[0];
        expect(token.tokenTicker).to.equal(amount.tokenTicker);
        expect(token.whole).to.equal(amount.whole);

        // unsubscribe from one, only one update should come
        unsubscribeFaucet.unsubscribe();
        // send a second payment
        await sendTransaction(writer, reader.chainId(), keyToAddress(rcpt), amount);

        await sleep(50);
        // no more facuet updates should come
        expect(updatesFaucet).to.equal(2);
        expect(acctFaucet).to.be.ok;
        expect(acctFaucet!.name).to.equal("admin");
        // rcpt should get one more callback
        expect(updatesRcpt).to.equal(3);
        expect(acctRcpt).to.be.ok;
        expect(acctRcpt!.name).to.be.undefined;
        expect(acctRcpt!.balance.length).to.equal(1);
        const token2 = acctRcpt!.balance[0];
        expect(token2.tokenTicker).to.equal(amount.tokenTicker);
        expect(token2.whole).to.equal(amount.whole * 2);

        // end other subscription
        unsubscribeRcpt.unsubscribe();
      } finally {
        reader.disconnect();
        rcptReader.disconnect();
      }
    });
  });
});
