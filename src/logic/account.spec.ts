import { Amount, BcpAccount, BlockInfoSucceeded, isBlockInfoPending, TokenTicker } from "@iov/bcp-types";
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
import { createProfile, ensureIdentity, getIdentity } from "./profile";
import { adminProfile, bnsFaucetSpec, mayTestBns, randomString, testSpec } from "./testhelpers";
import { waitForCommit } from "./transaction";

describe("getAccount", () => {
  mayTestBns("random account should be empty", async () => {
    const profile = await createProfile();
    const writer = new MultiChainSigner(profile);
    const testSpecData = await testSpec();
    const { connection: reader, codec } = await addBlockchain(writer, profile, testSpecData);
    const ident = await getIdentity(profile, reader.chainId());

    try {
      const acct = await getAccount(reader, ident, codec);
      expect(acct).toEqual(undefined);
    } finally {
      writer.shutdown();
    }
  });

  mayTestBns("faucet account should have tokens", async () => {
    const profile = await adminProfile();
    const writer = new MultiChainSigner(profile);
    const testSpecData = await testSpec();
    const { connection: reader, codec } = await addBlockchain(writer, profile, testSpecData);
    const ident = await getIdentity(profile, reader.chainId());
    console.log(`codec: ${testSpecData.codecType}, chainId: ${reader.chainId()}`);
    console.log(`address: ${writer.identityToAddress(ident)}`);

    try {
      const acct = await getAccount(reader, ident, codec);
      expect(acct).toBeTruthy();
      expect(acct!.balance.length).toEqual(1);
      // make sure the initial balance is over 1 million IOV
      const token = acct!.balance[0];
      const minBalance = { quantity: "1000000", fractionalDigits: 0, tokenTicker: "IOV" as TokenTicker };
      expect(compareAmounts(token, minBalance)).toBeGreaterThanOrEqual(1);
    } finally {
      writer.shutdown();
    }
  });
});

describe("sendTransaction", () => {
  mayTestBns(
    "moves token to new account",
    async () => {
      const faucet = await adminProfile();
      const empty = await createProfile();

      const writer = new MultiChainSigner(faucet);
      const testSpecData = await testSpec();
      const { connection: reader, codec } = await addBlockchain(writer, faucet, testSpecData);
      // we need to create proper identity here, add it was never passed to addBlockchain
      const rcpt = await ensureIdentity(empty, reader.chainId(), testSpecData.codecType);

      try {
        // ensure rcpt is empty before
        const before = await getAccount(reader, rcpt, codec);
        expect(before).toEqual(undefined);
        const { token: testTicker } = (await bnsFaucetSpec())!;
        // send a token from the genesis account
        const amount: Amount = {
          quantity: "12345678000",
          fractionalDigits: 9,
          tokenTicker: testTicker,
        };
        const res = await sendTransaction(
          faucet,
          writer,
          reader.chainId(),
          keyToAddress(rcpt, codec),
          amount,
          "hello",
        );
        const blockInfo = await res.blockInfo.waitFor(info => !isBlockInfoPending(info));
        const txHeight = (blockInfo as BlockInfoSucceeded).height;
        expect(txHeight).toBeGreaterThan(2);
        expect(res.transactionId).toBeTruthy();

        // ensure the recipient is properly rewarded
        const after = await getAccount(reader, rcpt, codec);
        expect(after).toBeTruthy();
        expect(after!.balance.length).toEqual(1);
        const token = after!.balance[0];
        expect(token.tokenTicker).toEqual(amount.tokenTicker);
        expect(token.quantity).toEqual(amount.quantity);
      } finally {
        writer.shutdown();
      }
    },
    3500,
  ); // default 2 seconds is not long enough when CI is under load
});

describe("setName", () => {
  mayTestBns(
    "sets a name on account with funds",
    async () => {
      const faucet = await adminProfile();
      const empty = await createProfile();
      const testSpecData = await testSpec();

      const writer = new MultiChainSigner(faucet);
      const { connection, codec } = await addBlockchain(writer, faucet, testSpecData);
      const rcptWriter = new MultiChainSigner(empty);
      const { identity: rcpt } = await addBlockchain(rcptWriter, empty, testSpecData);

      const reader = connection as BnsConnection;
      const rcptAddr = keyToAddress(rcpt, codec);
      const chainId = reader.chainId();
      await checkBnsBlockchainNft(faucet, reader, writer, chainId, "bns");

      try {
        const { token: testTicker } = (await bnsFaucetSpec())!;
        // send a token from the genesis account
        const amount: Amount = {
          quantity: "10000000000",
          fractionalDigits: 9,
          tokenTicker: testTicker,
        };
        await waitForCommit(sendTransaction(faucet, writer, chainId, rcptAddr, amount));

        // make sure some tokens were received
        const withMoney = await getAccount(reader, rcpt, codec);
        expect(withMoney).toBeTruthy();

        // TODO: big hack here - FIX THIS!!!
        // we need to register the blockchain before we can register a name on it...
        // how do we do that in the real app?

        // right now dont "automatically" in setName
        // by mainnet, will not be necessary

        // set the name - note we must sign with the recipient's writer
        const name = randomString(10);
        await waitForCommit(setName(empty, rcptWriter, chainId, name, [{ address: rcptAddr, chainId }]));

        // ensure the recipient is properly named
        const after = await getAccount(reader, rcpt, codec);
        expect(after).toBeTruthy();

        expect(after!.balance.length).toEqual(1);

        // make sure we have properly registered on this chain
        const addr = await getAddressByName(reader, name, chainId);
        expect(addr).toBeDefined();
        expect(addr).toEqual(rcptAddr);
      } finally {
        writer.shutdown();
        rcptWriter.shutdown();
      }
    },
    4000,
  ); // multiple transactions, so multiple blocks... let's give it some time

  describe("watchAccount", () => {
    mayTestBns(
      "updates on all changes",
      async () => {
        const faucet = await adminProfile();
        const empty = await createProfile();
        const testSpecData = await testSpec();

        const writer = new MultiChainSigner(faucet);
        const { connection: reader, codec, identity: faucetId } = await addBlockchain(
          writer,
          faucet,
          testSpecData,
        );
        const rcptWriter = new MultiChainSigner(empty);
        const { identity: rcpt } = await addBlockchain(rcptWriter, empty, testSpecData);

        try {
          let updatesFaucet = 0;
          let acctFaucet: BcpAccount | undefined;
          const unsubscribeFaucet = await watchAccount(
            reader,
            faucetId,
            (acct?: BcpAccount) => {
              updatesFaucet++;
              acctFaucet = acct;
            },
            codec,
          );

          let updatesRcpt = 0;
          let acctRcpt: BcpAccount | undefined;
          const unsubscribeRcpt = await watchAccount(
            reader,
            rcpt,
            (acct?: BcpAccount) => {
              updatesRcpt++;
              acctRcpt = acct;
            },
            codec,
          );

          // validate update messages came
          await sleep(50);
          expect(updatesFaucet).toEqual(1);
          expect(acctFaucet).toBeTruthy();
          expect(updatesRcpt).toEqual(1);
          expect(acctRcpt).toBe(undefined);

          const { token: testTicker } = (await bnsFaucetSpec())!;
          // send a token from the genesis account
          const amount: Amount = {
            quantity: "10000000000",
            fractionalDigits: 9,
            tokenTicker: testTicker,
          };
          await waitForCommit(
            sendTransaction(faucet, writer, reader.chainId(), keyToAddress(rcpt, codec), amount),
          );

          // validate update messages came
          await sleep(50);
          expect(updatesFaucet).toEqual(2);
          expect(acctFaucet).toBeTruthy();
          expect(updatesRcpt).toEqual(2);
          expect(acctRcpt).toBeTruthy();
          expect(acctRcpt!.balance.length).toEqual(1);
          const token = acctRcpt!.balance[0];
          expect(token.tokenTicker).toEqual(amount.tokenTicker);
          expect(token.quantity).toEqual(amount.quantity);

          // unsubscribe from one, only one update should come
          unsubscribeFaucet.unsubscribe();
          // send a second payment
          await waitForCommit(
            sendTransaction(faucet, writer, reader.chainId(), keyToAddress(rcpt, codec), amount),
          );

          await sleep(50);
          // no more facuet updates should come
          expect(updatesFaucet).toEqual(2);
          expect(acctFaucet).toBeTruthy();
          // rcpt should get one more callback
          expect(updatesRcpt).toEqual(3);
          expect(acctRcpt).toBeTruthy();
          expect(acctRcpt!.balance.length).toEqual(1);
          const token2 = acctRcpt!.balance[0];
          expect(token2.tokenTicker).toEqual(amount.tokenTicker);
          expect(token2.quantity).toEqual("20000000000");

          // end other subscription
          unsubscribeRcpt.unsubscribe();
        } finally {
          writer.shutdown();
          rcptWriter.shutdown();
        }
      },
      5000,
    );
  });
});
