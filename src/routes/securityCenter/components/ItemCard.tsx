import React from "react";

import Typography from "~/components/layout/Typography";

import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

interface Props extends WithStyles<typeof styles> {
  readonly title: string;
  readonly linkText: string;
  readonly onClickLink: () => void;
}

const styles = createStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    maxWidth: "450px",
    justifyContent: "space-between",
    width: "506px",
    height: "102px",
    marginTop: "16px",
  },
  leftPart: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "flex-start",
  },
  link: {
    cursor: "pointer",
  },
});

const ItemCard = ({ title, linkText, onClickLink, classes }: Props): JSX.Element => (
  <Card elevation={2} className={classes.container}>
    <CardContent>
      <Typography component="h6" variant="h6">
        {title}
      </Typography>
    </CardContent>
    <CardContent>
      <Typography className={classes.link} underlined variant="body1" color="primary" onClick={onClickLink}>
        {linkText}
      </Typography>
    </CardContent>
  </Card>
);

export const SecurityCard = withStyles(styles)(ItemCard);
