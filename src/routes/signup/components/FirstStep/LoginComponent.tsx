import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Link from "~/components/layout/Link";
import Typography from "~/components/layout/Typography";
import { LOG_IN_ROUTE } from "~/containers/routes";
import { xxl } from "~/theme/variables";

const styles = createStyles({
  container: {
    paddingTop: xxl,
  },
});

interface Props extends WithStyles<typeof styles> {}

const LoginComponent = ({ classes }: Props) => (
  <Block padding="xxl" align="right" margin="md">
    <Block className={classes.container} margin="xl">
      <Typography variant="subtitle1" inline>
        {"Already have an account?\u00a0"}
      </Typography>
      <Link to={LOG_IN_ROUTE}>
        <Typography variant="subtitle1" color="primary" underlined inline>
          Log In
        </Typography>
      </Link>
    </Block>
  </Block>
);

export default withStyles(styles)(LoginComponent);
