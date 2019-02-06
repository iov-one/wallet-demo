import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import classNames from "classnames";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Typography from "~/components/layout/Typography";
import { BALANCE_ROUTE, CONFIRM_TRANSACTION, PAYMENT_ROUTE, SEND_PAYMENT, TRANSACTIONS_ROUTE } from "~/routes";
import { history } from "~/store";
import { border, lg, primary } from "~/theme/variables";

const styles = createStyles({
  root: {
    display: "flex",
  },
  text: {
    marginTop: "12px",
  },
  item: {
    margin: `0px ${lg}`,
    "&:hover": {
      cursor: "pointer",
    },
  },
  activated: {
    "& $line": {
      visibility: "visible",
    },
  },
  line: {
    visibility: "hidden",
    height: "4px",
    backgroundColor: primary,
    borderRadius: "4px",
    marginTop: "4px",
  },
});

const onBalance = () => {
  history.push(BALANCE_ROUTE);
};

const onPayments = () => {
  history.push(PAYMENT_ROUTE);
};

const onTransactions = () => {
  history.push(TRANSACTIONS_ROUTE);
};


const BALANCE_TEXT = "Balance";
const PAYMENT_TEXT = "Payments";
const TRANSACTIONS_TEXT = "Transactions";

export const activeRoute = (path: string | undefined, classes: Record<keyof typeof styles, string>, validation: ((path: string) => boolean) | string | undefined): string => {
  if (!path || !validation) {
    return classes.item;
  }
  else if (typeof validation === "string") {
    return classNames(classes.item, path === validation ? classes.activated : undefined);
  }
  else if (validation instanceof Function) {
    return classNames(classes.item, validation(path) ? classes.activated : undefined);
  }

  return classes.item;
}

const paymentRouteValidation = (path: string) => (
  path === PAYMENT_ROUTE || path.startsWith(SEND_PAYMENT) || path.startsWith(CONFIRM_TRANSACTION)
)

interface LinkMenuProps extends WithStyles<typeof styles> {
  readonly phone?: boolean;
  readonly onClick: () => void;
  readonly itemTitle: string;
  readonly currentPath?: string;
  readonly pathValidation?: ((path: string) => boolean) | string;
}

const LinkMenuItem = withStyles(styles)(({ phone, onClick, itemTitle, currentPath, pathValidation, classes }: LinkMenuProps) => (
  phone ?
    (
      <ListItem button disableGutters onClick={onClick} >
        <ListItemText disableTypography>
          <Typography variant="body1">{itemTitle}</Typography>
        </ListItemText>
      </ListItem>
    )
    :
    (
      <Block className={activeRoute(currentPath, classes, pathValidation)}>
        <Block className={classes.text}>
          <Typography variant="subtitle2" color="textPrimary" className={classes.text} onClick={onClick}>
            {itemTitle}
          </Typography>
        </Block>
        <Block className={classes.line} />
      </Block>
    )
));

export const PhoneLinks = () => (
  <React.Fragment>
    <LinkMenuItem phone={true} onClick={onBalance} itemTitle={BALANCE_TEXT} />
    <LinkMenuItem phone={true} onClick={onPayments} itemTitle={PAYMENT_TEXT} />
    <LinkMenuItem phone={true} onClick={onTransactions} itemTitle={TRANSACTIONS_TEXT} />
    <Hairline color={border} margin="sm" />
  </React.Fragment>
);

interface LinksProps extends RouteComponentProps<{}>, WithStyles<typeof styles> { }

const DesktopLinksComponent = ({ classes, location }: LinksProps) => {
  const { pathname: path } = location;

  return (
    <Block className={classes.root}>
      <LinkMenuItem onClick={onBalance} itemTitle={BALANCE_TEXT} currentPath={path} pathValidation={BALANCE_ROUTE} />
      <LinkMenuItem onClick={onPayments} itemTitle={PAYMENT_TEXT} currentPath={path} pathValidation={paymentRouteValidation} />
      <LinkMenuItem onClick={onTransactions} itemTitle={TRANSACTIONS_TEXT} currentPath={path} pathValidation={TRANSACTIONS_ROUTE} />
    </Block>
  );
};

export const LinksDesktop = withStyles(styles)(withRouter(DesktopLinksComponent));
