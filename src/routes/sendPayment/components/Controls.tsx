import * as React from "react";
import Block from "~/components/layout/Block";
import Button from "~/components/layout/Button";
import { BALANCE_ROUTE } from "~/routes";
import { history } from "~/store";

interface Props {
  readonly submitting: boolean;
  readonly validating: boolean;
  readonly onContinue?: () => void;
}

const onCancel = () => {
  history.push(BALANCE_ROUTE);
};

const Controls = ({ submitting, validating, onContinue }: Props) => (
  <React.Fragment>
    <Block padding="lg" margin="lg">
      <Button
        variant="contained"
        color="primary"
        type={onContinue ? undefined : "submit"}
        disabled={submitting || validating}
        size="medium"
        spinner={submitting || validating}
        fullWidth
        onClick={onContinue}
      >
        Continue
      </Button>
    </Block>
    <Block padding="lg" margin="lg">
      <Button onClick={onCancel} variant="text" color="primary" disabled={submitting} size="medium" fullWidth>
        Cancel
      </Button>
    </Block>
  </React.Fragment>
);

export default Controls;
