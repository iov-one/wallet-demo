import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Link from "~/components/layout/Link";
import Typography from "~/components/layout/Typography";
import { SIGN_UP_ROUTE } from "~/containers/routes";
import { xxl } from "~/theme/variables";

const styles = createStyles({
  container: {
    paddingTop: xxl,
  },
});

interface Props extends WithStyles<typeof styles> {}

const SignupComponent = ({ classes }: Props) => (
  <React.Fragment>
    <Block className={classes.container} padding="xxl" margin="xxl" align="right">
      <Typography variant="subtitle1" inline>
        {"Don't have an IOV wallet?\u00a0"}
      </Typography>
      <Link to={SIGN_UP_ROUTE}>
        <Typography variant="subtitle1" color="primary" underlined inline>
          Sign up
        </Typography>
      </Link>
    </Block>
  </React.Fragment>
);

export default withStyles(styles)(SignupComponent);
