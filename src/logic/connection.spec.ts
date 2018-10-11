// tslint:disable:no-unused-expression
import { expect } from 'chai';
import 'mocha';

import { IovWriter } from '@iov/core';

import { addBlockchain } from "./connection";
import { createProfile } from "./profile";
import { skipTests, testSpec, } from "./testhelpers";

describe("addBlockchain", () => {
    it("should connect to local testnet", async function(): Promise<void> {
        if (skipTests()) {
            this.skip();
            return;
        }
        const profile = await createProfile();
        const writer = new IovWriter(profile);
        const reader = await addBlockchain(writer, testSpec);
        try {
            expect(reader).to.be.ok;
            // basic checks that we connected properly
            expect(reader.chainId()).to.include("chain-");
            expect(await reader.height()).to.be.greaterThan(1);    
        } finally {
            reader.disconnect();
        }
    });
});