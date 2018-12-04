import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import logo from "~/routes/signup/assets/logo.svg";
import people from "~/routes/signup/assets/People.svg";

const styles = createStyles({
  logo: {
    bottom: "80px",
    position: "relative",
    display: "flex",
    margin: "0 auto",
  },
});

interface Props extends WithStyles<typeof styles> {}

const ImageSection = ({ classes }: Props) => (
  <Block grow>
    <Img src={people} alt="Sign up Image" cover />
    <Img src={logo} alt="Logo" className={classes.logo} />
  </Block>
);

export default withStyles(styles)(ImageSection);
