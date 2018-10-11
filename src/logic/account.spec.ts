// tslint:disable:no-unused-expression
import { expect } from 'chai';
import 'mocha';

import { FungibleToken } from '@iov/bcp-types';
import { IovWriter } from '@iov/core';

import { getAccount, keyToAddress, sendTransaction } from './account';
import { addBlockchain } from "./connection";
import { createProfile, getMainIdentity } from "./profile";
import { faucetProfile, skipTests, testSpec, testTicker } from "./testhelpers";

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
            }
            const res = await sendTransaction(writer, reader.chainId(), keyToAddress(rcpt), amount, "hello");
            expect(res.metadata.height).to.be.greaterThan(2);
            expect(res.data.txid).to.be.ok;

            // ensure the recipient is properly rewarded
            const after = await getAccount(reader, rcpt);
            expect(after).to.equal(undefined);
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

