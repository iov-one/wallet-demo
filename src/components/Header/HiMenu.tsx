import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import * as React from "react";
import invite from "~/components/Header/assets/invite.svg";
import logout from "~/components/Header/assets/logout.svg";
import privacy from "~/components/Header/assets/privacyPolicy.svg";
import securityCentre from "~/components/Header/assets/securityCentre.svg";
import terms from "~/components/Header/assets/terms.svg";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import ListMenu from "~/components/templates/menu/ListMenu";
import { border, xs } from "~/theme/variables";

interface Props extends WithStyles<typeof styles> {}

interface HiElementProps {
  readonly src: string;
  readonly alt: string;
  readonly msg: string;
}

const HiElement = ({ src, alt, msg }: HiElementProps) => (
  <ListItem button>
    <ListItemIcon>
      <Img src={src} alt={alt} />
    </ListItemIcon>
    <ListItemText primary={msg} />
  </ListItem>
);

const styles = createStyles({
  root: {
    display: "flex",
    alignItems: "center",
  },
  chevron: {
    padding: xs,
  },
});

const HiMenu = ({ classes }: Props) => {
  const starter = (open: boolean) => (
    <Block className={classes.root}>
      <Typography variant="h6">Hi!</Typography>
      <IconButton className={classes.chevron} disableRipple>
        {open ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    </Block>
  );

  return (
    <ListMenu starter={starter} listWidth={278}>
      <HiElement src={securityCentre} msg="Security Center" alt="Security Center" />
      <Hairline color={border} />
      <HiElement src={invite} msg="Invite friends" alt="Invite friends" />
      <Hairline color={border} />
      <HiElement src={terms} msg="Terms & Conditions" alt="Terms & Conditions" />
      <Hairline color={border} />
      <HiElement src={privacy} msg="Privacy Policy" alt="Privacy Policy" />
      <Hairline color={border} />
      <HiElement src={logout} msg="Log out" alt="Log out" />
    </ListMenu>
  );
};

export default withStyles(styles)(HiMenu);
