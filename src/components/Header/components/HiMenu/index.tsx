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
import phoneMenu from "~/components/Header/assets/PhoneMenu.svg";
import phoneMenuGreen from "~/components/Header/assets/PhoneMenuGreen.svg";
import privacy from "~/components/Header/assets/privacyPolicy.svg";
import securityCentre from "~/components/Header/assets/securityCentre.svg";
import terms from "~/components/Header/assets/terms.svg";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import ListMenu, { PhoneHook } from "~/components/templates/menu/ListMenu";
import { INVITE_ROUTE, SECURITY_CENTER_ROUTE } from "~/routes";
import { history } from "~/store";
import { border, lg, xs } from "~/theme/variables";
import { PhoneLinks } from "../LinksMenu";

interface Props extends PhoneHook, WithStyles<typeof styles> {}

interface HiElementProps {
  readonly src: string;
  readonly alt: string;
  readonly msg: string;
  readonly phone: boolean;
  readonly action: () => void;
}

const HiElement = ({ src, alt, action, phone, msg }: HiElementProps) => (
  <ListItem disableGutters button onClick={action}>
    {!phone && (
      <ListItemIcon>
        <Img src={src} alt={alt} />
      </ListItemIcon>
    )}
    <ListItemText disableTypography>
      <Typography variant={phone ? "body1" : "body2"}>{msg}</Typography>
    </ListItemText>
    {phone && (
      <ListItemIcon>
        <Img src={src} alt={alt} />
      </ListItemIcon>
    )}
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
  separator: {
    height: "30px",
    paddingRight: lg,
    borderLeft: `1px solid ${border}`,
  },
});

const onSecurityCenter = () => {
  history.push(SECURITY_CENTER_ROUTE);
};

const onInvite = () => {
  history.push(INVITE_ROUTE);
};

const HiMenu = ({ classes, phoneMode, ...rest }: Props) => {
  const phoneStarter = (_: boolean, open: boolean) => (
    <React.Fragment>
      <Block className={classes.separator} />
      <Block>
        {open ? <Img src={phoneMenuGreen} alt="Phone Menu" /> : <Img src={phoneMenu} alt="Phone Menu" />}
      </Block>
    </React.Fragment>
  );

  const desktopStarter = (_: boolean, open: boolean) => (
    <Block className={classes.root}>
      <Typography variant="h6">Hi!</Typography>
      <IconButton className={classes.chevron} disableRipple>
        {open ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    </Block>
  );

  return (
    <ListMenu
      starter={phoneMode ? phoneStarter : desktopStarter}
      listWidth={280}
      phoneMode={phoneMode}
      {...rest}
    >
      <Block padding={phoneMode ? "lg" : "md"}>
        {phoneMode && <PhoneLinks />}
        <HiElement
          src={securityCentre}
          phone={phoneMode}
          action={onSecurityCenter}
          msg="Security Center"
          alt="Security Center"
        />
        {!phoneMode && <Hairline color={border} />}
        <HiElement
          src={invite}
          action={onInvite}
          phone={phoneMode}
          msg="Invite friends"
          alt="Invite friends"
        />
        {!phoneMode && <Hairline color={border} />}
        <HiElement
          src={terms}
          action={onSecurityCenter}
          phone={phoneMode}
          msg="Terms & Conditions"
          alt="Terms & Conditions"
        />
        {!phoneMode && <Hairline color={border} />}
        <HiElement
          src={privacy}
          action={onSecurityCenter}
          phone={phoneMode}
          msg="Privacy Policy"
          alt="Privacy Policy"
        />
        {!phoneMode && <Hairline color={border} />}
        <HiElement src={logout} action={onSecurityCenter} phone={phoneMode} msg="Log out" alt="Log out" />
      </Block>
    </ListMenu>
  );
};

export default withStyles(styles)(HiMenu);
