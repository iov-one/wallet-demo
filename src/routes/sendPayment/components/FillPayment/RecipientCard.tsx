import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import { required } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Tooltip from "~/components/layout/dialogs/Tooltip";
import Typography from "~/components/layout/Typography";

export const RECIPIENT_FIELD = "recipient";

interface State {
  readonly howItWorksHook: HTMLDivElement | null;
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
    howItWorksHook: null,
  };
  private readonly howItWorksHookRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    this.setState(() => ({
      howItWorksHook: this.howItWorksHookRef.current,
    }));
  }

  public render(): JSX.Element {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Block margin="xl" />
        <Typography variant="body2" weight="semibold">
          To
        </Typography>
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
          <Typography inline variant="body2">
            How it works
          </Typography>
          <Block padding="xs" />
          <Tooltip phoneHook={this.state.howItWorksHook}>
            <Typography variant="body2">
              Send payments to anyone with an IOV handle, and it will go directly to their account. If they
              don’t have an IOV account add their blockchain address.
            </Typography>
          </Tooltip>
        </Block>
        <div ref={this.howItWorksHookRef} />
        <Block margin="xl" />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(RecipientCard);
