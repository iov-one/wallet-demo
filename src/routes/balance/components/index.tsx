import { BcpCoin } from "@iov/bcp-types";
import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Tooltip from "~/components/layout/dialogs/Tooltip";
import GridItem, { Order } from "~/components/layout/GridItem";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Link from "~/components/layout/Link";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { amountToString, trimAmount } from "~/logic";
import receive from "~/routes/balance/assets/transactionReceive.svg";
import send from "~/routes/balance/assets/transactionSend.svg";
import { background, md } from "~/theme/variables";

interface Props extends WithStyles<typeof styles> {
  readonly name: string | undefined;
  readonly tokens: ReadonlyArray<BcpCoin>;
  readonly phone: boolean;
  readonly onSendPayment: () => void;
  readonly onReceivePayment: () => void;
}

const styles = createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  separator: {
    flexShrink: 1,
    flexBasis: md,
  },
  container: {
    backgroundColor: background,
    height: "unset",
    flexBasis: "450px",
  },
  info: {
    display: "flex",
    flexDirection: "column",
  },
  actions: {
    flexBasis: "90px",
    alignItems: "center",
    justifyContent: "center",
    height: "unset",
  },
  action: {
    backgroundColor: background,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexBasis: "217px",
    height: "90px",
    justifyContent: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  tooltip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

const LISK_FAUCET = "https://testnet-faucet.lisk.io";
const ETH_FACUET = "https://faucet.rinkeby.io/";

interface CardProps {
  readonly text: string;
  readonly logo: string;
  readonly className: string;
  readonly onAction?: () => void;
}

const Card = ({ text, logo, className, onAction }: CardProps) => (
  <Block className={className} onClick={onAction}>
    <Img src={logo} height={36} width={36} alt={text} />
    <Typography>{text}</Typography>
  </Block>
);

interface State {
  readonly howItWorksHook: HTMLDivElement | null;
}

class BalanceLayout extends React.Component<Props, State> {
  public readonly state = {
    howItWorksHook: null,
  };
  private readonly howItWorksHookRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    this.setState(() => ({
      howItWorksHook: this.howItWorksHookRef.current,
    }));
  }

  public render(): JSX.Element {
    const { classes, name, tokens, phone, onSendPayment, onReceivePayment } = this.props;
    const spacer: Order = { xs: 1 };
    const actions: Order = { xs: 5 };
    const actionSpacer: Order = { xs: 4 };
    const info: Order = { xs: 2 };
    const grow: Order = { xs: 3 };
    const hasTokens = tokens && tokens.length;

    return (
      <React.Fragment>
        <GridItem order={spacer}>
          <Block margin="xxl" />
        </GridItem>
        <GridItem order={actions} className={classes.actions}>
          <Card text="Send payment" logo={send} onAction={onSendPayment} className={classes.action} />
          {!phone && <Block className={classes.separator} />}
          <Card
            text="Receive Payment"
            logo={receive}
            onAction={onReceivePayment}
            className={classes.action}
          />
        </GridItem>
        <GridItem order={actionSpacer}>
          <Block margin="lg" />
        </GridItem>
        <GridItem order={info}>
          <Spacer order={1} />
          <Block className={classes.container}>
            <Block padding={phone ? "lg" : "xl"} className={classes.info}>
              <Block margin="sm" />
              <Block margin="xl" />
              <Typography variant="h5" align="center" weight="light">
                {name ? name : "--"}
              </Typography>
              <Hairline margin="xl" />
              <Typography variant="subtitle2" align="center">
                {hasTokens ? "Your currencies" : "No funds available"}
              </Typography>
              <Block margin="xl" />
              {tokens.map((token: BcpCoin) => (
                <Typography
                  key={token.tokenTicker}
                  pointer
                  underlined
                  variant="h6"
                  weight="regular"
                  color="primary"
                  align="center"
                  onClick={onSendPayment}
                >
                  {`${amountToString(trimAmount(token))}`}
                </Typography>
              ))}
              <Block margin="sm" />
              <Block className={classes.tooltip}>
                <Typography inline variant="body2">
                  need funds?
                </Typography>
                <Block padding="xs" />
                <Tooltip maxWidth={350} phoneHook={this.state.howItWorksHook}>
                  <Typography variant="body2">
                    Claim test LSK here <Link to={LISK_FAUCET}>{LISK_FAUCET}</Link>
                  </Typography>
                  <Block margin="sm" />
                  <Typography variant="body2">
                    Claim test ETH here <Link to={ETH_FACUET}>{ETH_FACUET}</Link>
                  </Typography>
                </Tooltip>
              </Block>
              <div ref={this.howItWorksHookRef} />
              <Block margin="lg" />
              <Block margin="xl" />
            </Block>
          </Block>
          <Spacer order={1} />
        </GridItem>
        <GridItem grow order={grow} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(BalanceLayout);
