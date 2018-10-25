import config from "config";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import { ChainId, MultiChainSigner, UserProfile } from "@iov/core";

import { PageStructure } from "../components/compoundComponents/page";
import { CreateWalletForm } from "../components/templates/forms";
import { BlockchainSpec } from "../logic/connection";
import { ChainAccount, getMyAccounts, getProfile, getSigner } from "../selectors";
import { bootSequence, drinkFaucetSequence, setNameSequence } from "../sequences";

interface HomeState {
  readonly name: string;
  readonly profileCreated: boolean;
  readonly ready: boolean;
  readonly chainId: ChainId;
}

// In RouteComponentProps you can pass in the actual properties you read from the routers...
// like "title", "route" if any. Otherwise, I think it just adds history
interface HomeProps extends RouteComponentProps<{}> {
  readonly accounts: ReadonlyArray<ChainAccount>;
  readonly profile: UserProfile | undefined;
  readonly signer: MultiChainSigner | undefined;
}

// Separate Dispatch props here so we can properly type below in the mapState/Dispatch to props
interface HomeDispatchProps {
  readonly boot: (password: string, blockchains: ReadonlyArray<BlockchainSpec>) => Promise<MultiChainSigner>;
  readonly drinkFaucet: (facuetUri: string, chainId: ChainId) => Promise<any>;
  readonly setName: (name: string, chainId: ChainId) => Promise<any>;
}

// HomeProps & HomeDispatchProps means to use them both (as if we hadn't just separated them)
class Home extends React.Component<HomeProps & HomeDispatchProps, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      profileCreated: false,
      ready: false,
      chainId: "" as ChainId,
    };
  }
  public componentDidMount(): void {
    const { boot } = this.props;
    const setup = async () => {
      await boot(config.get("defaultPassword"), [config.get("chainSpec")]);
      this.checkAndDrinkFaucet();
    };
    setup();
  }
  public checkAndDrinkFaucet(): void {
    const {
      accounts: [{ account, chainId }],
      drinkFaucet,
      history,
    } = this.props;
    if (!account) {
      const setup = async () => {
        await drinkFaucet(config.get("defaultFaucetUri"), chainId);
        this.setState({
          ready: true,
        });
      };
      setup();
    } else {
      if (!account.name) {
        this.setState({
          ready: true,
        });
      } else {
        history.push("/balance/");
      }
    }
  }
  public createAccount(): void {
    const { name, ready } = this.state;
    if (ready) {
      const {
        setName,
        accounts: [{ chainId }],
        history,
      } = this.props;
      const setup = async () => {
        await setName(name, chainId);
        history.push("/balance/");
      };
      setup();
    }
  }
  public render(): JSX.Element {
    return (
      <PageStructure whiteBg>
        <CreateWalletForm
          onNext={() => {
            this.createAccount();
          }}
          onChange={name => {
            this.setState({
              name,
            });
          }}
        />
      </PageStructure>
    );
  }
}

// Note that this takes ownProps as an argument (for the router stuff), and must return a typed HomeProps
const mapStateToProps = (state: any, ownProps: HomeProps): HomeProps => ({
  ...ownProps,
  profile: getProfile(state),
  signer: getSigner(state),
  accounts: getMyAccounts(state),
});

// This returns a types DispatchProps
const mapDispatchToProps = (dispatch: any): HomeDispatchProps => ({
  boot: (password: string, blockchains: ReadonlyArray<BlockchainSpec>) =>
    dispatch(bootSequence(password, blockchains)),
  drinkFaucet: (facuetUri: string, chainId: ChainId) => dispatch(drinkFaucetSequence(facuetUri, chainId)),
  setName: (name: string, chainId: ChainId) => dispatch(setNameSequence(name, chainId)),
});

// With the above info, we can now properly combine this all and withRouter will be happy
const connectedModule = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export const HomePage = withRouter(connectedModule);
