import * as React from "react";
import Block from "~/components/layout/Block";
import Button from "~/components/layout/Button";

interface Props {
  readonly valid: boolean;
  readonly submitting: boolean;
  readonly validating: boolean;
}

const Controls = ({ submitting, valid, validating }: Props) => (
  <React.Fragment>
    <Block padding="lg" margin="lg">
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={submitting || validating}
        size="medium"
        spinner={submitting || validating}
        fullWidth
      >
        Continue
      </Button>
    </Block>
    <Block padding="lg" margin="lg">
      <Button variant="text" color="primary" disabled={submitting} size="medium" fullWidth>
        Cancel
      </Button>
    </Block>
  </React.Fragment>
);

export default Controls;
