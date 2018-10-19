// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone

import { BcpConnection } from "@iov/bcp-types";
import { ChainId, MultiChainSigner, UserProfile } from "@iov/core";
import { PublicIdentity } from "@iov/keycontrol";
import { isEmpty } from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import { PageStructure } from "../components/compoundComponents/page";
import { CreateWalletForm } from "../components/templates/forms";

import { BlockchainSpec, CodecType } from "../../logic/connection";
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

class Home extends React.Component<any, HomeState> {
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
    this.createProfile();
  }
  public getSnapshotBeforeUpdate(prevProps: any): any {
    if (!isEmpty(this.props.profile.internal.profile) && isEmpty(prevProps.profile.internal.profile)) {
      return {
        profileCreated: true,
      };
    }
    return false;
  }
  public componentDidUpdate(prevProps: any): void {
    if (!isEmpty(this.props.profile.internal.profile) && isEmpty(prevProps.profile.internal.profile)) {
      this.nextStep();
    }
  }
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
  private readonly createAccount = (): any => {
    const {
      blockchain: {
        internal: { signer },
      },
    } = this.props;
    const { chainId, name } = this.state;
    if (this.state.ready) {
      setName(signer, chainId, name).then((response: any) => {
        console.log(response);
      });
    } else {
      alert("Not ready for set name for your account");
    }
  };
  private nextStep(): any {
    const {
      profile: {
        internal: { profile },
      },
    } = this.props;
    this.props.getMainIdentity(profile);
  }
  private readonly addBlockchain = (): any => {
    const {
      blockchain: {
        internal: { signer },
      },
      profile: {
        activeIdentity: { identity },
      },
      addBlockchain,
    } = this.props;
    addBlockchain(signer, chainSpec).then((responseAction: any) => {
      const {
        action: { type },
        value: blockchain,
      } = responseAction;
      if (type === "ADD_BLOCKCHAIN_FULFILLED") {
        const chainId = blockchain.chainId();
        const addr = signer.keyToAddress(chainId, identity.pubkey);
        this.setState({
          ready: true,
          chainId,
        });
        takeFaucetCredit("https://faucet.friendnet-slow.iov.one/faucet", addr)
          .then(() => {
            this.setState({
              ready: true,
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };
  private readonly createProfile = (): any => {
    const {
      profile: {
        internal: { db },
      },
      createProfile,
      getMainIdentity,
      createSigner,
    } = this.props;
    createProfile(db, "pass-phrase").then((createProfileAction: any) => {
      const {
        action: { type },
        value: profile,
      } = createProfileAction;
      if (type === "CREATE_PROFILE_FULFILLED") {
        getMainIdentity(profile);
        createSigner(profile);
        this.addBlockchain();
      }
    });
  };
}

const mapStateToProps = (state: any): any => ({
  profile: state.profile,
  blockchain: state.blockchain,
});

const mapDispatchToProps = (dispatch: any) => ({
  bootSequence: (password: string, blockchains: ReadonlyArray<BlockchainSpec>) => dispatch(bootSequence(password, blockchains)),
  drinkFaucetSequence: (facuetUri: string, chainId: ChainId) => dispatch(drinkFaucetSequence(facuetUri, chainId)),
  setNameSequence: (name: string, chainId: ChainId) => dispatch(setNameSequence(name, chainId)),
});

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
