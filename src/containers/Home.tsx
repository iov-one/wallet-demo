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
import { getProfile, getSigner } from "../../selectors";
import { bootSequence, drinkFaucetSequence, setNameSequence } from "../../sequences";

const chainSpec: BlockchainSpec = {
  codecType: CodecType.Bns,
  bootstrapNodes: ["wss://bov.friendnet-slow.iov.one/"],
};

interface HomeState {
  readonly name: string;
  readonly profileCreated: boolean;
  readonly ready: boolean;
  readonly chainId: ChainId;
}

interface HomeProps {
  readonly profile: UserProfile | undefined;
  readonly signer: MultiChainSigner | undefined;
  readonly bootSequence: (
    password: string,
    blockchains: ReadonlyArray<BlockchainSpec>,
  ) => Promise<MultiChainSigner>;
  readonly drinkFaucetSequence: (facuetUri: string, chainId: ChainId) => Promise<any>;
  readonly setNameSequence: (name: string, chainId: ChainId) => Promise<any>;
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
  public componentDidMount(): any {
    this.props.bootSequence("test-pass", [chainSpec]);
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
});

const mapDispatchToProps = (dispatch: any) => ({
  bootSequence: (password: string, blockchains: ReadonlyArray<BlockchainSpec>) =>
    dispatch(bootSequence(password, blockchains)),
  drinkFaucetSequence: (facuetUri: string, chainId: ChainId) =>
    dispatch(drinkFaucetSequence(facuetUri, chainId)),
  setNameSequence: (name: string, chainId: ChainId) => dispatch(setNameSequence(name, chainId)),
});

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
