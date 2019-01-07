import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import { xl, xxl } from "~/theme/variables";
import people from "~/routes/signupPass/assets/People.svg";
import { fieldRegex } from "~/components/forms/validator";


const styles = createStyles({
  noticeBox: {
    width: 320,
    height: 330,
    opacity: 0.7,
    borderRadius: 5,
    padding: xl,
    margin: xxl,
    boxShadow: "0 0 20px 0 rgba(237, 237, 237, 0.44)",
    backgroundImage: "linear-gradient(to top, #ffffff, rgba(255, 255, 255, 0.71))",
  },
  leftSide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
    backgroundImage: "linear-gradient(to top, #ecf4f3, #cdeae7)",
  },
});

const NoticeBox = ({ classes }: WithStyles<typeof styles>) => {
  return (
    <Block className={classes.leftSide}>
      <Block className={classes.noticeBox}>
        <Typography variant="subtitle2">
          To recover the password, you must enter the twelve backup words in the correct order that you have written down. Note if you have lost or forgotten your twelve backup words you will be unable to recover your account.
        </Typography>
      </Block>
    </Block>
  );
}
const NoticeBoxWithStyles = withStyles(styles)(NoticeBox);
export default () => <NoticeBoxWithStyles />
