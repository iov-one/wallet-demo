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
    (async () => {
      await boot(defaultPassword, [chainSpec]);
      // TODO: check current account, if undefined, drinkFaucet
      // TODO: check if current account has name
      //   yes -> go to next page
      //   no -> display this page
    })();
  }
  public createAccount(): void {
    console.log("do this later");
  }
  // public getSnapshotBeforeUpdate(prevProps: any): any {
  //   if (!isEmpty(this.props.profile.internal.profile) && isEmpty(prevProps.profile.internal.profile)) {
  //     return {
  //       profileCreated: true,
  //     };
  //   }
  //   return false;
  // }
  // public componentDidUpdate(prevProps: any): void {
  //   if (!isEmpty(this.props.profile.internal.profile) && isEmpty(prevProps.profile.internal.profile)) {
  //     this.nextStep();
  //   }
  // }
  public render(): JSX.Element {
    // const { history } = this.props;
    // TODO: if not ready, then display "loading", else display "real data"...
    return (
      <PageStructure whiteBg>
        <CreateWalletForm
          onNext={this.createAccount}
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
