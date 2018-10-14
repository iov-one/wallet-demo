import { KeyringEntryId, LocalIdentity, UserProfile } from "@iov/keycontrol";

export interface ProfileState {
  readonly profile?: UserProfile;
  readonly activeIdentity?: ActiveIdentity;
}

export interface ActiveIdentity {
  readonly walletId: KeyringEntryId;
  readonly identity: LocalIdentity;
}
