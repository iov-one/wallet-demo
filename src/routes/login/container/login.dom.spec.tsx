import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import TestUtils from "react-dom/test-utils";
import { Provider } from "react-redux";
import { Store } from "redux";

import { mayTestBns, randomString } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { fixTypes } from "~/reducers/helpers";
import { createProfileAsyncAction } from "~/reducers/profile";
import Route, { LOGIN_ROUTE, SET_NAME_ROUTE } from "~/routes";
import { getProfileDB } from "~/selectors";
import { shutdownSequence } from "~/sequences";
import { aNewStore, history } from "~/store";
import { sleep } from "~/utils/timer";

// TODO: this is copied from signup.dom.spec.tsx 
// this function should probably be pulled into a helper file somewhere, but I don't know proper location
const createDom = (store: Store): React.Component<any, any, any> =>
  TestUtils.renderIntoDocument(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route />
      </ConnectedRouter>
    </Provider>,
  ) as React.Component;

export const travelToLogin = async (store: Store, profilePass: string): Promise<React.Component<{}>> => {
  // --- initialize the profile
  const db = getProfileDB(store.getState());
  const { value: profile } = await fixTypes(
    store.dispatch(createProfileAsyncAction.start(db, profilePass, undefined)),
  );
  expect(profile).toBeDefined();
  expect(profile.wallets.value.length).toBe(1);

  // now, go to login with existing profile
  history.push(LOGIN_ROUTE);
  return createDom(store);
};

describe("DOM > Feature > Login", () => {
  let store: Store<RootState>;
  let profilePass: string;
  let walletDom: React.Component;

  beforeEach(async () => {
    profilePass = randomString(16);
    store = aNewStore();

    walletDom = await travelToLogin(store, profilePass);
  });

  afterEach(() => {
    shutdownSequence(null, store.getState);
  });

  mayTestBns(
    `should redirect to ${SET_NAME_ROUTE} route after success login`,
    async () => {
      const inputs = TestUtils.scryRenderedDOMComponentsWithTag(walletDom, "input");

      const password = inputs[0];
      TestUtils.Simulate.change(password, { target: { value: profilePass } } as any);

      const form = TestUtils.findRenderedDOMComponentWithTag(walletDom, "form");
      if (!form) {
        throw new Error();
      }
      TestUtils.Simulate.submit(form);

      await sleep(3000);
      expect(store.getState().router.location.pathname).toBe(SET_NAME_ROUTE);
    },
    10000,
  );
});
