import { BnsConnection } from "@iov/bns";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import {
  composeValidators,
  fieldRegex,
  lengthGreaterThan,
  lengthLowerThan,
  required,
} from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { getUsernameNftByUsername } from "~/reducers/blockchain";
import { md } from "~/theme/variables";

export const USERNAME_FIELD = "username";

interface Props extends ParentType, WithStyles<typeof styles> {}

const styles = createStyles({
  container: {
    display: "flex",
    flexWrap: "nowrap",
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
    lineHeight: "50px",
  },
});

const account = /^[a-z0-9_]+$/;
const error = "Allowed lowercase letters, numbers and _";

const takenName = (connection: BnsConnection | undefined) => async (name: string) => {
  if (!connection) {
    return "BNS connection is not active";
  }

  const isTaken = (await getUsernameNftByUsername(connection, name)) !== undefined;
  if (isTaken) {
    return "Name is already taken";
  }

  return undefined;
};

const FormComponent = ({ connection, classes }: Props) => (
  <MatchMediaContext.Consumer>
    {phone => (
      <React.Fragment>
        <Block padding={phone ? "lg" : "xxl"} maxWidth={450} margin="xxl">
          <Block margin="sm">
            <Typography variant="subtitle2" color="textPrimary">
              Username
            </Typography>
          </Block>
          <Block className={classes.container} margin="md">
            <Field
              className={classes.field}
              variant="outlined"
              fullWidth
              name={USERNAME_FIELD}
              type="text"
              component={TextField}
              validate={composeValidators(
                required,
                fieldRegex(account, error),
                lengthGreaterThan(4),
                lengthLowerThan(20),
                takenName(connection),
              )}
              align="right"
              placeholder="username"
            />
            <Typography inline variant="h6" className={classes.domain} weight="light">
              *iov
            </Typography>
          </Block>
        </Block>
      </React.Fragment>
    )}
  </MatchMediaContext.Consumer>
);

const SecondStepForm = withStyles(styles)(FormComponent);

interface ParentType {
  readonly connection: BnsConnection | undefined;
}

export default ({ connection }: ParentType) => <SecondStepForm connection={connection} />;
