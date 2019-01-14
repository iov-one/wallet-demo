import { Amount, BcpAccount, BcpBlockInfoInBlock, BcpTransactionState, TokenTicker } from "@iov/bcp-types";
import { BnsConnection } from "@iov/bns";
import { MultiChainSigner } from "@iov/core";

import { sleep } from "../utils/timer";

import {
  getAccount,
  getAddressByName,
  keyToAddress,
  sendTransaction,
  setName,
  watchAccount,
} from "./account";
import { compareAmounts } from "./balances";
import { addBlockchain, checkBnsBlockchainNft } from "./connection";
import { createProfile, getMainIdentity } from "./profile";
import { adminProfile, faucetSpec, mayTest, randomString, testSpec } from "./testhelpers";
import { waitForCommit } from "./transaction";

describe("getAccount", () => {
  mayTest("random account should be empty", async () => {
    const profile = await createProfile();
    const writer = new MultiChainSigner(profile);
    const testSpecData = await testSpec();
    const reader = await addBlockchain(writer, testSpecData);
    try {
      const acct = await getAccount(reader, getMainIdentity(profile));
      expect(acct).toEqual(undefined);
    } finally {
      reader.disconnect();
    }
  });

  mayTest("faucet account should have tokens", async () => {
    const profile = await adminProfile();
    const writer = new MultiChainSigner(profile);
    const testSpecData = await testSpec();
    const reader = await addBlockchain(writer, testSpecData);
    try {
      const acct = await getAccount(reader, getMainIdentity(profile));
      expect(acct).toBeTruthy();
      expect(acct!.name).toEqual("admin");
      expect(acct!.balance.length).toEqual(1);
      // make sure the initial balance is over 1 million IOV
      const token = acct!.balance[0];
      const minBalance = { quantity: "1000000", fractionalDigits: 0, tokenTicker: "IOV" as TokenTicker };
      expect(compareAmounts(token, minBalance)).toBeGreaterThanOrEqual(1);
    } finally {
      reader.disconnect();
    }
  });
});

describe("sendTransaction", () => {
  mayTest(
    "moves token to new account",
    async () => {
      const faucet = await adminProfile();
      const empty = await createProfile();
      const rcpt = getMainIdentity(empty);

      const writer = new MultiChainSigner(faucet);
      const testSpecData = await testSpec();
      const reader = await addBlockchain(writer, testSpecData);
      try {
        // ensure rcpt is empty before
        const before = await getAccount(reader, rcpt);
        expect(before).toEqual(undefined);
        const { token: testTicker } = await faucetSpec();
        // send a token from the genesis account
        const amount: Amount = {
          quantity: "12345678000",
          fractionalDigits: 9,
          tokenTicker: testTicker,
        };
        const res = await sendTransaction(writer, reader.chainId(), keyToAddress(rcpt), amount, "hello");
        const blockInfo = await res.blockInfo.waitFor(info => info.state === BcpTransactionState.InBlock);
        const txHeight = (blockInfo as BcpBlockInfoInBlock).height;
        expect(txHeight).toBeGreaterThan(2);
        expect(res.transactionId).toBeTruthy();

        // ensure the recipient is properly rewarded
        const after = await getAccount(reader, rcpt);
        expect(after).toBeTruthy();
        expect(after!.name).toEqual(undefined);
        expect(after!.balance.length).toEqual(1);
        const token = after!.balance[0];
        expect(token.tokenTicker).toEqual(amount.tokenTicker);
        expect(token.quantity).toEqual(amount.quantity);
      } finally {
        reader.disconnect();
      }
    },
    3500,
  ); // default 2 seconds is not long enough when CI is under load
});

describe("setName", () => {
  mayTest(
    "sets a name on account with funds",
    async () => {
      const faucet = await adminProfile();
      const empty = await createProfile();
      const rcpt = getMainIdentity(empty);
      const rcptAddr = keyToAddress(rcpt);

      const writer = new MultiChainSigner(faucet);
      const testSpecData = await testSpec();
      const reader = (await addBlockchain(writer, testSpecData)) as BnsConnection;
      const chainId = reader.chainId();
      await checkBnsBlockchainNft(reader, writer, chainId, "bns");

      const rcptWriter = new MultiChainSigner(empty);
      const rcptReader = await addBlockchain(rcptWriter, testSpecData);
      try {
        const { token: testTicker } = await faucetSpec();
        // send a token from the genesis account
        const amount: Amount = {
          quantity: "10000000000",
          fractionalDigits: 9,
          tokenTicker: testTicker,
        };
        await waitForCommit(sendTransaction(writer, chainId, rcptAddr, amount));

        // make sure some tokens were received
        const withMoney = await getAccount(reader, rcpt);
        expect(withMoney).toBeTruthy();

        // TODO: big hack here - FIX THIS!!!
        // we need to register the blockchain before we can register a name on it...
        // how do we do that in the real app?

        // on yaknet, i guess we pre-register the names ourselves.
        // in test code, we update the startup???

        // set the name - note we must sign with the recipient's writer
        const name = randomString(10);
        // TODO: right now this hangs forever as the transaction errors (issue #677 in iov-core)
        await waitForCommit(setName(rcptWriter, chainId, name, [{ address: rcptAddr, chainId }]));

        // ensure the recipient is properly named
        const after = await getAccount(reader, rcpt);
        expect(after).toBeTruthy();

        // no more name, using username
        expect(after!.name).toBeUndefined();
        expect(after!.balance.length).toEqual(1);

        // make sure we have properly registered on this chain
        const addr = await getAddressByName(reader, name, chainId);
        expect(addr).toBeDefined();
        expect(addr).toEqual(rcptAddr);
      } finally {
        reader.disconnect();
        rcptReader.disconnect();
      }
    },
    4000,
  ); // multiple transactions, so multiple blocks... let's give it some time

  describe("watchAccount", () => {
    mayTest(
      "updates on all changes",
      async () => {
        const faucet = await adminProfile();
        const empty = await createProfile();
        const rcpt = getMainIdentity(empty);

        const writer = new MultiChainSigner(faucet);
        const testSpecData = await testSpec();
        const reader = await addBlockchain(writer, testSpecData);

        const rcptWriter = new MultiChainSigner(empty);
        const rcptReader = await addBlockchain(rcptWriter, testSpecData);
        try {
          let updatesFaucet = 0;
          let acctFaucet: BcpAccount | undefined;
          const unsubscribeFaucet = await watchAccount(
            reader,
            getMainIdentity(faucet),
            (acct?: BcpAccount) => {
              updatesFaucet++;
              acctFaucet = acct;
            },
          );

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

          const { token: testTicker } = await faucetSpec();
          // send a token from the genesis account
          const amount: Amount = {
            quantity: "10000000000",
            fractionalDigits: 9,
            tokenTicker: testTicker,
          };
          await waitForCommit(sendTransaction(writer, reader.chainId(), keyToAddress(rcpt), amount));

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
          expect(token.quantity).toEqual(amount.quantity);

          // unsubscribe from one, only one update should come
          unsubscribeFaucet.unsubscribe();
          // send a second payment
          await waitForCommit(sendTransaction(writer, reader.chainId(), keyToAddress(rcpt), amount));

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
          expect(token2.quantity).toEqual("20000000000");

          // end other subscription
          unsubscribeRcpt.unsubscribe();
        } finally {
          reader.disconnect();
          rcptReader.disconnect();
        }
      },
      5000,
    );
  });
});
