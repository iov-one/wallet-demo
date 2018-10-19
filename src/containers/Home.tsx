// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone

// import { BcpConnection } from "@iov/bcp-types";
import { ChainId, MultiChainSigner, UserProfile } from "@iov/core";
// import { PublicIdentity } from "@iov/keycontrol";
// import { isEmpty } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { PageStructure } from "../components/compoundComponents/page";
import { CreateWalletForm } from "../components/templates/forms";

import { BlockchainSpec, CodecType } from "../../logic/connection";
import { ChainAccount, getMyAccounts, getProfile, getSigner } from "../../selectors";
import { bootSequence, drinkFaucetSequence, setNameSequence } from "../../sequences";

// TODO: these constants should come from config or props later
const chainSpec: BlockchainSpec = {
  codecType: CodecType.Bns,
  bootstrapNodes: ["wss://bov.friendnet-slow.iov.one/"],
};
const defaultPassword = "test-pass";
const facuetUri = "https://faucet.friendnet-slow.iov.one/faucet";

interface HomeState {
  readonly name: string;
  readonly profileCreated: boolean;
  readonly ready: boolean;
  readonly chainId: ChainId;
}

interface HomeProps {
  readonly accounts: ReadonlyArray<ChainAccount>;
  readonly profile: UserProfile | undefined;
  readonly signer: MultiChainSigner | undefined;
  readonly boot: (password: string, blockchains: ReadonlyArray<BlockchainSpec>) => Promise<MultiChainSigner>;
  readonly drinkFaucet: (facuetUri: string, chainId: ChainId) => Promise<any>;
  readonly setName: (name: string, chainId: ChainId) => Promise<any>;
}

class Home extends React.Component<HomeProps, HomeState> {
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
    } = this.props;
    if (!account) {
      const setup = async () => {
        await drinkFaucet(facuetUri, chainId);
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
      }
    }
  }
  public createAccount(): void {
    const { name, ready } = this.state;
    if (ready) {
      const {
        setName,
        accounts: [{ chainId }],
      } = this.props;
      const setup = async () => {
        await setName(name, chainId);
      };
      setup();
    }
  }
  public render(): JSX.Element {
    // const { history } = this.props;
    // TODO: if not ready, then display "loading", else display "real data"...
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

const mapStateToProps = (state: any): any => ({
  profile: getProfile(state),
  signer: getSigner(state),
  accounts: getMyAccounts(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  boot: (password: string, blockchains: ReadonlyArray<BlockchainSpec>) =>
    dispatch(bootSequence(password, blockchains)),
  drinkFaucet: (facuetUri: string, chainId: ChainId) => dispatch(drinkFaucetSequence(facuetUri, chainId)),
  setName: (name: string, chainId: ChainId) => dispatch(setNameSequence(name, chainId)),
});

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
