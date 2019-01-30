import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import { required } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Tooltip from "~/components/layout/dialogs/Tooltip";
import IovTypography from "~/components/layout/Typography";
import SendCard from "./SendCard";

export const RECIPIENT_FIELD = "recipient";

interface State {
  readonly phoneHook: HTMLDivElement | null;
}

interface Props extends WithStyles<typeof styles> {}

const styles = createStyles({
  tooltip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

class RecipientCard extends React.Component<Props, State> {
  public readonly state = {
    phoneHook: null,
  };
  private readonly phoneHookRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    this.setState(() => ({
      phoneHook: this.phoneHookRef.current,
    }));
  }

  public render(): JSX.Element {
    const { classes } = this.props;
    return (
      <SendCard>
        <Block margin="xl" />
        <IovTypography variant="body2" weight="semibold">
          To
        </IovTypography>
        <Block margin="md" />
        <Field
          variant="outlined"
          name={RECIPIENT_FIELD}
          type="text"
          fullWidth
          component={TextField}
          validate={required}
          placeholder="IOV or wallet address"
        />
        <Block margin="lg" />
        <Block margin="sm" className={classes.tooltip}>
          <IovTypography inline variant="body2">
            How it works
          </IovTypography>
          <Block padding="xs" />
          <Tooltip phoneHook={this.state.phoneHook}>
            Send payments to anyone with an IOV handle, and it will go directly to their account. If they
            don’t have an IOV account add their blockchain address.
          </Tooltip>
        </Block>
        <div ref={this.phoneHookRef} />
        <Block margin="xl" />
      </SendCard>
    );
  }
}

export default withStyles(styles)(RecipientCard);
