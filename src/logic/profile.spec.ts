// tslint:disable:no-unused-expression
import { expect } from 'chai';
import 'mocha';

import { UserProfile } from "@iov/keycontrol";

import { createProfile, getMainIdentity } from "./profile";

describe("createProfile", () => {
    it("should return a profile with one keyring, and one identity", async () => {
        const profile = await createProfile();
        expect(profile.wallets.value.length).to.equal(1);
        const { id } = profile.wallets.value[0];
        const idents = profile.getIdentities(id);
        expect(idents.length).to.equal(1);
    });

    it("should return unique identities each time", async () => {
        const profile1 = await createProfile();
        const ident1 = getMainIdentity(profile1);
        expect(ident1).to.be.ok;

        const profile2 = await createProfile();
        const ident2 = getMainIdentity(profile2);
        expect(ident2).to.be.ok;

        expect(ident1).not.to.equal(ident2);
        expect(ident1.id).not.to.equal(ident2.id);
    });
});


describe("getMainIdentity", () => {
    it("should error if no data present", async () => {
        const profile = new UserProfile();
        expect(() => getMainIdentity(profile)).to.throw();
    });
});
