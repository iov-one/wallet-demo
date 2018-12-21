import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import loading from "~/components/Header/assets/loading.svg";
import logoBlack from "~/components/Header/assets/logoBlack.svg";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import Spacer from "~/components/layout/Spacer";
import BellMenu from "./BellMenu";
import HiMenu from "./HiMenu";
import Links from "./Links";

const styles = createStyles({
  root: {
    alignItems: "center",
    display: "flex",
    flexWrap: "nowrap",
    height: "70px",
    backgroundColor: "white",
  },
  spin: {
    animation: "spinKeyframe 5s infinite linear",
  },
  "@keyframes spinKeyframe": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "50%": {
      transform: "rotate(180deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  bell: {},
});

interface Props extends WithStyles<typeof styles> {}

const Header = ({ classes }: Props) => (
  <React.Fragment>
    <Block className={classes.root} padding="xxl">
      <Img src={logoBlack} alt="Logo" />
      <Spacer order={1} />
      <Links />
      <Spacer order={4} />
      {/* TODO refactor in #96 to include badge using IconGroup */}
      <Img src={loading} className={classes.spin} alt="Loading Transactions" />
      <BellMenu items={[]} />
      <HiMenu />
    </Block>
  </React.Fragment>
);

export default withStyles(styles)(Header);
