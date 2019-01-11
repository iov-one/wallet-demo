import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import CircleImg from "~/components/layout/CircleImage";
import Typography from "~/components/layout/Typography";
import { background, md, xl, xxl } from "~/theme/variables";
import bulb from "../assets/bulb.svg";
import NoticeSidebar from "./NoticeSidebar";

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
  header: {
    display: "flex",
    alignItems: "center",
  },
  bulbIcon: {
    marginRight: md,
  },
});

const NoticeBox = ({ classes }: WithStyles<typeof styles>) => {
  return (
    <NoticeSidebar>
      <Block className={classes.noticeBox}>
        <Block className={classes.header}>
          <Block className={classes.bulbIcon}>
            <CircleImg dia={50} icon={bulb} alt="sidebar bulb" circleColor="#ffe152" />
          </Block>
          <Typography variant="h6" weight="light">
            Important
          </Typography>
        </Block>
        <Block margin="md" />
        <Typography variant="subtitle1">
          Do not store your backup phrase on your computer or anywhere online. It is very important to keep
          your backup phrase offline in a private place. As a reminder: anyone with access to your backup
          phrase can access your funds.
        </Typography>
      </Block>
    </NoticeSidebar>
  );
};
export default withStyles(styles)(NoticeBox);
