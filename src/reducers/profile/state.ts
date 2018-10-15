import { KeyringEntryId, LocalIdentity, UserProfile } from "@iov/keycontrol";

import { StringDB } from "../../logic";

export interface ProfileState {
  readonly internal: InternalDetails;
  readonly activeIdentity?: ActiveIdentity;
}

export interface ActiveIdentity {
  readonly walletId: KeyringEntryId;
  readonly identity: LocalIdentity;
}

// Note: components should not use this directly, just pass to logic functions
export interface InternalDetails {
  readonly db: StringDB;
  readonly profile?: UserProfile;
}
