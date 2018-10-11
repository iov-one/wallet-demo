// tslint:disable:no-unused-expression
import { expect } from 'chai';
import 'mocha';

import { IovWriter } from '@iov/core';

import { getAccount } from './account';
import { addBlockchain } from "./connection";
import { createProfile, getMainIdentity } from "./profile";
import {  faucetProfile, skipTests, testSpec, } from "./testhelpers";

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