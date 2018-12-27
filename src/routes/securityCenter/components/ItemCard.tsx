import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import React from "react";
import BadgeIcon from "~/components/layout/BadgeIcon";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { background, lg } from "~/theme/variables";
import CheckIcon from "../assets/check.svg";

const styles = createStyles({
  container: {
    display: "flex",
  },
  card: {
    backgroundColor: background,
    display: "flex",
    padding: lg,
    alignItems: "center",
    width: "100%",
    maxWidth: "506px",
  },
  info: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
  },
  titleBox: {
    flexGrow: 1,
    minWidth: "30px",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly title: string;
  readonly action: string;
  readonly icon: string;
  readonly onClick: () => void;
}

const Badge = <Img src={CheckIcon} alt="Badge Icon" />;

const SecurityCard = ({ title, icon, action, classes, onClick }: Props): JSX.Element => (
  <Block className={classes.container} margin="md">
    <Spacer order={1} />
    <Block maxWidth={506} className={classes.card}>
      <BadgeIcon icon={icon} badge={Badge} width={25} height={23} />
      <Block className={classes.info} padding="lg">
        <Block className={classes.titleBox}>
          <Typography component="h6" variant="h6">
            {title}
          </Typography>
        </Block>
        <Block>
          <Typography underlined pointer variant="body1" color="primary" align="right" onClick={onClick}>
            {action}
          </Typography>
        </Block>
      </Block>
    </Block>
    <Spacer order={1} />
  </Block>
);

export default withStyles(styles)(SecurityCard);
