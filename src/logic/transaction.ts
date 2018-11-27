import { BcpAccount, BcpConnection, ConfirmedTransaction, FungibleToken, SendTx } from "@iov/bcp-types";
import { PublicIdentity } from "@iov/keycontrol";

import { getAccount, getAccountByAddress, keyToAddress } from "./account";

export interface TransNotificationInfo {
  readonly received: boolean;
  readonly signerAccount?: BcpAccount;
  readonly recipientAccount?: BcpAccount;
  readonly amount: FungibleToken;
  readonly time?: string;
  readonly success: boolean;
}

export const parseConfirmedTransaction = async (
  conn: BcpConnection,
  trans: ConfirmedTransaction,
  identity: PublicIdentity,
): Promise<TransNotificationInfo> => {
  const transaction = trans.transaction as SendTx;
  const { recipient, amount, signer } = transaction;
  const recipientAccount = await getAccountByAddress(conn, recipient);
  const signerAccount = await getAccount(conn, { pubkey: signer });
  const address = keyToAddress(identity);
  const received = (recipientAccount && address === recipientAccount.address) || false;
  return {
    amount,
    recipientAccount,
    signerAccount,
    received,
    success: true,
  };
};
