import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import BadgeIcon from "~/components/layout/BadgeIcon";
import Block from "~/components/layout/Block";
import Link from "~/components/layout/Link";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { background, card, lg } from "~/theme/variables";

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
    maxWidth: card,
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
  readonly link: string;
}

const SecurityCard = ({ title, icon, action, classes, link }: Props): JSX.Element => (
  <Block className={classes.container} margin="md">
    <Spacer order={1} />
    <Block maxWidth={506} className={classes.card}>
      <BadgeIcon invisible={false} icon={icon} badge="check" width={25} height={23} />
      <Block className={classes.info} padding="lg">
        <Block className={classes.titleBox}>
          <Typography component="h6" variant="h6">
            {title}
          </Typography>
        </Block>
        <Block>
          <Link to={link}>
            <Typography underlined pointer variant="body1" color="primary" align="right">
              {action}
            </Typography>
          </Link>
        </Block>
      </Block>
    </Block>
    <Spacer order={1} />
  </Block>
);

export default withStyles(styles)(SecurityCard);
