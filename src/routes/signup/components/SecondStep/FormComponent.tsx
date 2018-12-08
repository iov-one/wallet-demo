import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import { md } from "~/theme/variables";

const USERNAME_FIELD = "username";

interface Props extends WithStyles<typeof styles> {}

const styles = createStyles({
  container: {
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    maxWidth: "450px",
  },
  field: {
    maxWidth: "400px",
    "& * input": {
      textAlign: "right",
    },
  },
  domain: {
    marginLeft: md,
  },
});

const FormComponent = ({ classes }: Props) => (
  <React.Fragment>
    <Block padding="xxl" maxWidth={450} margin="xxl">
      <Block margin="sm">
        <Typography variant="subtitle2" color="textPrimary">
          Username
        </Typography>
      </Block>
      <Block className={classes.container}>
        <Field
          className={classes.field}
          variant="outlined"
          fullWidth
          name={USERNAME_FIELD}
          type="text"
          component={TextField}
          align="right"
          placeholder="username"
        />
        <Typography inline variant="h6" className={classes.domain} weight="light">
          *iov
        </Typography>
      </Block>
    </Block>
  </React.Fragment>
);

const SecondStepForm = withStyles(styles)(FormComponent);

export default () => <SecondStepForm />;
