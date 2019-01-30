import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import { required } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import IovTypography from "~/components/layout/Typography";
import SendCard from "./SendCard";

export const RECIPIENT_FIELD = "recipient";

interface State {
  readonly noteHook: HTMLDivElement | null;
}

interface Props extends WithStyles<typeof styles> {}

const styles = createStyles({
  container: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "baseline",
  },
});

class RecipientCard extends React.Component<Props, State> {
  public readonly state = {
    noteHook: null,
  };
  private readonly noteHookRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    this.setState(() => ({
      noteHook: this.noteHookRef.current,
    }));
  }

  public render(): JSX.Element {
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
        <Block margin="sm" />
      </SendCard>
    );
  }
}

export default withStyles(styles)(RecipientCard);
