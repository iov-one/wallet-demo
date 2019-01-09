import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Link from "~/components/layout/Link";
import Typography from "~/components/layout/Typography";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { SIGNUP_ROUTE } from "~/routes";
import { xxl } from "~/theme/variables";

const styles = createStyles({
  container: {
    paddingTop: xxl,
  },
});

interface Props extends WithStyles<typeof styles> {}

const SignupComponent = ({ classes }: Props) => (
  <MatchMediaContext.Consumer>
    {phone => (
      <Block className={classes.container} padding={phone ? "lg" : "xxl"} margin="xxl" align="right">
        <Typography variant="subtitle1" inline>
          Don't have an IOV wallet?&nbsp;
        </Typography>
        <Link to={SIGNUP_ROUTE}>
          <Typography variant="subtitle1" color="primary" underlined inline>
            Sign up
          </Typography>
        </Link>
      </Block>
    )}
  </MatchMediaContext.Consumer>
);

export default withStyles(styles)(SignupComponent);
