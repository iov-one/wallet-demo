import sendTransaction, { SendTxType } from "~/routes/sendPayment/store/actions/sendTransaction";

export interface SendPaymentActions {
  readonly sendTransaction: SendTxType;
}

export default {
  sendTransaction,
};
