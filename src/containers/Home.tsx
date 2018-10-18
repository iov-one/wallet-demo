// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone

import { isEmpty } from "lodash";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { PageStructure } from "../components/compoundComponents/page";
import { CreateWalletForm } from "../components/templates/forms";

import { createProfileAsyncAction, getIdentityAction } from "../../reducers/profile";
import { getMainWalletAndIdentity } from "src/logic";
import { UserProfile } from "@iov/core";

class Home extends React.Component<any, { readonly name: string; readonly profileCreated: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: "",
      profileCreated: false,
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
          onNext={() => {}}
          onChange={name => {
            this.setState({
              name,
            });
          }}
        />
      </PageStructure>
    );
  }
  public nextStep(): any {
    const {
      profile: {
        internal: { profile },
      },
    } = this.props;
    this.props.getMainIdentity(profile);
  }
  private readonly createProfile = (): any => {
    const {
      profile: {
        internal: { db },
      },
      createProfile,
      getMainIdentity,
    } = this.props;
    createProfile(db, "pass-phrase").then((createProfileAction: any) => {
      const {
        action: { type },
        value: profile,
      } = createProfileAction;
      if (type === "CREATE_PROFILE_FULFILLED") {
        return getMainIdentity(profile);
      }
    });
  };
}

const mapStateToProps = (state: any): any => ({
  profile: state.profile,
  blockchain: state.blockchain,
});

const mapDispatchToProps = (dispatch: any) => ({
  createProfile: (db: any, pass: string) => dispatch(createProfileAsyncAction.start(db, pass, {})),
  getMainIdentity: (profile: UserProfile) => dispatch(getIdentityAction(profile)),
});

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
