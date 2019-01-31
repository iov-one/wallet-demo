import { BcpCoin } from "@iov/bcp-types";
import { FormState } from "final-form";
import * as React from "react";
import Form from "~/components/forms/Form";
import { Item } from "~/components/forms/SelectField";
import Block from "~/components/layout/Block";
import PageMenuColumn from "~/components/pages/PageMenuColumn";
import Controls from "~/routes/sendPayment/components/Controls";
import NoteCard from "./NoteCard";
import RecipientCard from "./RecipientCard";
import SendAmount from "./SendAmount";

export interface SendBalance {
  readonly balance: BcpCoin;
  readonly tickersWithBalance: ReadonlyArray<Item>;
  readonly defaultTicker: string;
  readonly onUpdateBalanceToSend: (ticker: Item) => void;
}

interface Props extends SendBalance {
  readonly onSubmit: (values: object) => Promise<void>;
  readonly validation?: (values: object) => object | Promise<object>;
  readonly initialValues?: object;
}

const subscription = {
  submitting: true,
  validating: true,
};

export const FillPayment = ({
  onSubmit,
  validation,
  initialValues,
  balance,
  tickersWithBalance,
  defaultTicker,
  onUpdateBalanceToSend,
}: Props) => (
  <PageMenuColumn phoneFullWidth>
    <Block margin="xxl" />
    <Block margin="md" />
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      subscription={subscription}
      validation={validation}
      fullWidth
    >
      {({ submitting, validating }: FormState) => (
        <React.Fragment>
          <SendAmount
            balance={balance}
            tickersWithBalance={tickersWithBalance}
            defaultTicker={defaultTicker}
            onUpdateBalanceToSend={onUpdateBalanceToSend}
          />
          <RecipientCard />
          <NoteCard />
          <Controls submitting={submitting} validating={validating} />
        </React.Fragment>
      )}
    </Form>
  </PageMenuColumn>
);
