import { KeyringEntryId, LocalIdentity, UserProfile } from "@iov/keycontrol";

export interface ProfileState {
  // Note: components should not use this directly, just pass to logic functions
  readonly profile?: UserProfile;
  readonly activeIdentity?: ActiveIdentity;
}

export interface ActiveIdentity {
  readonly walletId: KeyringEntryId;
  readonly identity: LocalIdentity;
}
