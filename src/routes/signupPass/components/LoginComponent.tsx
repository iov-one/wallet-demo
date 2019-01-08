import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Link from "~/components/layout/Link";
import Typography from "~/components/layout/Typography";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { LOGIN_ROUTE } from "~/routes";
import { xxl } from "~/theme/variables";

const styles = createStyles({
  container: {
    paddingTop: xxl,
  },
});

interface Props extends WithStyles<typeof styles> {}

const LoginComponent = ({ classes }: Props) => (
  <MatchMediaContext.Consumer>
    {phone => (
      <React.Fragment>
        <Block className={classes.container} padding={phone ? "lg" : "xxl"} margin="xxl" align="right">
          <Typography variant="subtitle1" inline>
            {"Already have an account?\u00a0"}
          </Typography>
          <Link to={LOGIN_ROUTE}>
            <Typography variant="subtitle1" color="primary" underlined inline>
              Log In
            </Typography>
          </Link>
        </Block>
      </React.Fragment>
    )}
  </MatchMediaContext.Consumer>
);

export default withStyles(styles)(LoginComponent);
