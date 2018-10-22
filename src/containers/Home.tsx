// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone

import { ChainId, MultiChainSigner, UserProfile } from "@iov/core";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";

import { PageStructure } from "../components/compoundComponents/page";
import { CreateWalletForm } from "../components/templates/forms";

import { BlockchainSpec, CodecType } from "../logic/connection";
import { ChainAccount, getMyAccounts, getProfile, getSigner } from "../selectors";
import { bootSequence, drinkFaucetSequence, setNameSequence } from "../sequences";

// TODO: these constants should come from config or props later
const chainSpec: BlockchainSpec = {
  codecType: CodecType.Bns,
  bootstrapNodes: ["wss://bov.friendnet-slow.iov.one/"],
};
const defaultPassword = "test-pass";
const defaultFacuetUri = "https://faucet.friendnet-slow.iov.one/faucet";

interface HomeState {
  readonly name: string;
  readonly profileCreated: boolean;
  readonly ready: boolean;
  readonly chainId: ChainId;
}

interface HomeProps extends RouteComponentProps<{}> {
  readonly accounts: ReadonlyArray<ChainAccount>;
  readonly profile: UserProfile | undefined;
  readonly signer: MultiChainSigner | undefined;
}

interface HomeDispatchProps {
  readonly boot: (password: string, blockchains: ReadonlyArray<BlockchainSpec>) => Promise<MultiChainSigner>;
  readonly drinkFaucet: (facuetUri: string, chainId: ChainId) => Promise<any>;
  readonly setName: (name: string, chainId: ChainId) => Promise<any>;
}

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
      await boot(defaultPassword, [chainSpec]);
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
        await drinkFaucet(defaultFacuetUri, chainId);
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

const mapStateToProps = (state: any, ownProps: HomeProps): HomeProps => ({
  ...ownProps,
  profile: getProfile(state),
  signer: getSigner(state),
  accounts: getMyAccounts(state),
});

const mapDispatchToProps = (dispatch: any): HomeDispatchProps => ({
  boot: (password: string, blockchains: ReadonlyArray<BlockchainSpec>) =>
    dispatch(bootSequence(password, blockchains)),
  drinkFaucet: (facuetUri: string, chainId: ChainId) => dispatch(drinkFaucetSequence(facuetUri, chainId)),
  setName: (name: string, chainId: ChainId) => dispatch(setNameSequence(name, chainId)),
});

const connectedModule = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export const HomePage = withRouter(connectedModule);
