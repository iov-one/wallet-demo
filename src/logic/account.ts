import { Address, BcpCoin, BcpTransactionResponse, TransactionKind, UnsignedTransaction,  } from "@iov/bcp-types";
import { IovWriter } from "@iov/core";
import { ChainId } from "@iov/tendermint-types";

import { getMainIdentity, getMainKeyring } from "./profile";


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
