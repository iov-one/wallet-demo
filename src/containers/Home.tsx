// tslint:disable:no-string-literal
import config from "config";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import { ChainId, MultiChainSigner, UserProfile } from "@iov/core";

import { PageStructure } from "../components/compoundComponents/page";
import { NextButton } from "../components/subComponents/buttons";
import { CreateWalletForm } from "../components/templates/forms";
import { BlockchainSpec } from "../logic/connection";
import { ChainAccount, getMyAccounts, getProfile, getSigner } from "../selectors";
import { bootSequence, drinkFaucetSequence, resetSequence, setNameSequence } from "../sequences";

interface HomeState {
  readonly name: string;
  readonly profileCreated: boolean;
  readonly ready: boolean;
  readonly chainId: ChainId;
  readonly error: boolean;
  readonly errorMessage: string;
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
  readonly reset: (password: string) => Promise<any>;
  readonly boot: (password: string, blockchains: ReadonlyArray<BlockchainSpec>) => Promise<MultiChainSigner>;
  readonly drinkFaucet: (facuetUri: string) => Promise<any>;
  readonly setName: (name: string, chainId: ChainId) => Promise<any>;
}

// HomeProps & HomeDispatchProps means to use the (as if we hadn't just separated them)
class Home extends React.Component<HomeProps & HomeDispatchProps, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      profileCreated: false,
      ready: false,
      chainId: "" as ChainId,
      error: false,
      errorMessage: "",
    };
  }
  public async componentDidMount(): Promise<void> {
    const { boot } = this.props;
    try {
      await boot(config["defaultPassword"], [config["chainSpec"]]);
      await this.checkAndDrinkFaucet();
    } catch (err) {
      console.log("error during boot phase");
      console.log(err);
    }
  }
  public async checkAndDrinkFaucet(): Promise<void> {
    const {
      accounts: [{ account }],
      drinkFaucet,
      history,
    } = this.props;
    if (!account) {
      await drinkFaucet(config["defaultFaucetUri"]);
      this.setState({
        ready: true,
      });
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
  public async createAccount(): Promise<void> {
    const { name, ready } = this.state;
    if (ready) {
      const {
        setName,
        accounts: [{ chainId }],
        history,
      } = this.props;
      try {
        await setName(name, chainId);
        history.push("/balance/");
      } catch (err) {
        this.setState({
          error: true,
          errorMessage: "Name is already taken",
        });
      }
    } else {
      // TODO: better display, actually we shouldn't even render page until ready (show loading)
      console.log("Not ready yet");
    }
  }
  public onChangeName(name: string): void {
    // taken from https://github.com/iov-one/weave/blob/master/x/namecoin/msg.go#L29
    const regex = /^[a-z0-9_]{4,20}$/;  
    const error = regex.exec(name) === null;
    let errorMessage: string;
    if (!error) { 
      errorMessage = "";
    } else if (name.length < 4) {
      errorMessage = "Name must be at least 4 characters";
    } else if (name.length > 20) {
      errorMessage = "Name cannot be longer than 20 characters";
    } else {
      errorMessage = "Name must be lower case letters and numbers";
    }
    this.setState({
      name,
      error,
      errorMessage,
    });
  }

  public render(): JSX.Element {
    return <PageStructure whiteBg>{this.renderChild()}</PageStructure>;
  }

  private renderChild(): JSX.Element {
    const { error, errorMessage } = this.state;
    if (this.state.ready) {
      return (
        <CreateWalletForm
          onNext={() => {
            this.createAccount();
          }}
          onChange={name => this.onChangeName(name)}
          error={error}
          errorMessage={errorMessage}
        />
      );
    } else {
      return (
        <NextButton
          title="Reset Account"
          disabled={error}
          onClick={() => {
            this.resetProfile();
          }}
        />
      );
    }
  }

  private async resetProfile(): Promise<void> {
    await this.props.reset(config["defaultPassword"]);
    await this.componentDidMount();
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
  drinkFaucet: (facuetUri: string) => dispatch(drinkFaucetSequence(facuetUri)),
  reset: (password: string) => dispatch(resetSequence(password)),
  setName: (name: string, chainId: ChainId) => dispatch(setNameSequence(name, chainId)),
});

// With the above info, we can now properly combine this all and withRouter will be happy
const connectedModule = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export const HomePage = withRouter(connectedModule);
