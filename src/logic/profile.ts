import { Bip39, Random } from "@iov/crypto";
import { Ed25519HdWallet, HdPaths, LocalIdentity, UserProfile } from "@iov/keycontrol";

import { hasDbKey, StringDB } from "./db";

const EntropyBytes = 16;

// initializes a UserProfile with one keyring and one identity using random seed
export async function createProfile(): Promise<UserProfile> {
    const entropy = await Random.getBytes(EntropyBytes);
    const mnemonic = Bip39.encode(entropy).asString();
    const keyring = Ed25519HdWallet.fromMnemonic(mnemonic)
    const profile = new UserProfile();
    profile.addEntry(keyring);
    await profile.createIdentity(keyring.id, HdPaths.simpleAddress(0));
    return profile;
}

// returns the first identity on the first keyring.
// throws an error if this doesn't exist
export function getMainIdentity(profile: UserProfile): LocalIdentity {
    const wallets = profile.wallets.value;
    if (wallets.length < 1) {
        throw new Error("No wallet on the UserProfile");
    }
    const walletId = wallets[0].id;
    const idents = profile.getIdentities(walletId);
    if (idents.length < 1) {
        throw new Error("There must be an identity on the first wallet");
    }
    return idents[0];
}

// returns true if there is a profile to load
export async function hasStoredProfile(db: StringDB): Promise<boolean> {
    // copied from userProfile.ts.... there should be a cleaner way
    const storageKeyCreatedAt = "created_at";
    const storageKeyKeyring = "keyring";
    return (await hasDbKey(db, storageKeyCreatedAt)) && hasDbKey(db, storageKeyKeyring);
}

// loads the profile if possible, otherwise creates a new one and saves it
// throws an error on existing profile, but bad password
export async function loadOrCreateProfile(db: StringDB, password: string): Promise<UserProfile> {
    if (await hasStoredProfile(db)) {
        return UserProfile.loadFrom(db, password);
    }
    const profile = await createProfile();
    await profile.storeIn(db, password);
    return profile;
}