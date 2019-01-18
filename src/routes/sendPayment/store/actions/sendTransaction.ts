import { Amount } from "@iov/bcp-types";
import { ChainId } from "@iov/core";
import { sendTransactionSequence } from "~/sequences";

export type SendTxType = (
  chainId: ChainId,
  address: string,
  amount: Amount,
  note: string,
  id: string,
) => Promise<void>;

export default (chainId: ChainId, address: string, amount: Amount, note: string, id: string) => async (
  dispatch: any,
): Promise<void> => dispatch(sendTransactionSequence(chainId, address, amount, note, id));
