import { Address, BcpAccount, BcpCoin, BcpConnection, BcpTransactionResponse, TransactionKind, TxCodec, UnsignedTransaction,    } from "@iov/bcp-types";
import { bnsCodec } from "@iov/bns";
import { IovWriter } from "@iov/core";
import { PublicIdentity } from "@iov/keycontrol";
import { ChainId } from "@iov/tendermint-types";

import { getMainIdentity, getMainKeyring } from "./profile";

// queries account on bns chain by default
// TODO: how to handle toher chains easier
export async function getAccount(reader: BcpConnection, ident: PublicIdentity, codec: TxCodec = bnsCodec): Promise<BcpAccount|undefined> {
    const address = codec.keyToAddress(ident.pubkey);
    const result = await reader.getAccount({address});
    if (result.data && result.data.length > 0) {
        return result.data[0];
    }
    return undefined;
}

// sends the given transaction from the main account
export async function sendTransaction(
    writer: IovWriter,
    chainId: ChainId,
    recipient: Address,
    amount: BcpCoin,
    memo?: string,
  ): Promise<BcpTransactionResponse> {
      const walletId = getMainKeyring(writer.profile);
      const signer = getMainIdentity(writer.profile);
      const unsigned : UnsignedTransaction = {
        kind: TransactionKind.Send,
        chainId: chainId,
        signer: signer.pubkey,
        recipient: recipient,
        memo,
        amount,
      };
      return writer.signAndCommit(unsigned, walletId);
  }
