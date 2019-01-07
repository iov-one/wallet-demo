import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import CircleImg from "~/components/layout/CircleImage";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { background, md, xl, xxl } from "~/theme/variables";
import bulb from "../assets/bulb.svg";



const styles = createStyles({
  noticeBox: {
    display: "flex",
    flexDirection: "column",
    opacity: 0.7,
    borderRadius: 5,
    padding: xl,
    margin: xxl,
    boxShadow: "0 0 20px 0 rgba(237, 237, 237, 0.44)",
    backgroundImage: `linear-gradient(to top, ${background}, rgba(255, 255, 255, 0.71))`,
  },
  leftSide: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
    backgroundImage: "linear-gradient(to top, #ecf4f3, #cdeae7)",
  },
  header: {
    display: "flex",    
    alignItems: "center",
  },
  bulbIcon: {
    marginRight: md,
  }
});

const NoticeBox = ({ classes }: WithStyles<typeof styles>) => {
  return (
    <Block className={classes.leftSide}>
      <Spacer order={1} />
      <Block className={classes.noticeBox}>
        <Block className={classes.header}>
          <Block className={classes.bulbIcon}>
            <CircleImg dia={50} icon={bulb} alt="sidebar bulb" circleColor="#ffe152"/>
          </Block>
          <Typography variant="h6" weight="light">
            Important
          </Typography>
        </Block>
        <Block margin="md" />
        <Typography variant="subtitle1">
          To recover the password, you must enter the twelve backup words in the correct order that you have written down. Note if you have lost or forgotten your twelve backup words you will be unable to recover your account.
        </Typography>
      </Block>
      <Spacer order={1} />
    </Block>
  );
}
const NoticeBoxWithStyles = withStyles(styles)(NoticeBox);
export default () => <NoticeBoxWithStyles />
