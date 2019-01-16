import * as React from "react";
import { Errors } from "~/components/forms/Form";
import PageMenuColumn from "~/components/pages/PageMenuColumn";
import { CONFIRM_TRANSACTION } from "~/routes";
import Layout from "~/routes/sendPayment/components";
import { history } from "~/store";

class SendPayment extends React.Component {
  public readonly onSendPayment = async (values: object): Promise<void> => {
    console.log(values)
    history.push(CONFIRM_TRANSACTION);
  };

  public readonly onSendPaymentValidation = (values: object): object => {
    console.log(values)
    const errors: Errors = {};

    return errors;
  };

  public render(): JSX.Element {
    return (
      <PageMenuColumn phoneFullWidth>
        <Layout onSubmit={this.onSendPayment} validation={this.onSendPaymentValidation} />
      </PageMenuColumn>
    );
  }
}

export default SendPayment;
