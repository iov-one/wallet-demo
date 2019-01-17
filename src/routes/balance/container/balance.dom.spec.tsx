import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import TestUtils from "react-dom/test-utils";
import { Provider } from "react-redux";
import { Store } from "redux";

import { mayTestBns, randomString } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { fixTypes } from "~/reducers/helpers";
import Route, { BALANCE_ROUTE, HOME_ROUTE } from "~/routes";
import { setNameSequence, shutdownSequence } from "~/sequences";
import { loginSequence } from "~/sequences/login";
import { aNewStore, history } from "~/store";
import { sleep } from "~/utils/timer";

// Okay, this is getting stupid with cut and paste... sorry
const createDom = (store: Store): React.Component<any, any, any> =>
  TestUtils.renderIntoDocument(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route />
      </ConnectedRouter>
    </Provider>,
  ) as React.Component;

export const setUsername = async (store: Store, password: string, userName: string): Promise<void> => {
  // create profile, drink faucets
  const action = loginSequence(password);
  await fixTypes(store.dispatch(action as any));
  // set the username
  const setName = setNameSequence(userName);
  await fixTypes(store.dispatch(setName as any));
};

export const travelToBalance = async (
  store: Store,
  password: string,
  username: string,
): Promise<React.Component> => {
  await setUsername(store, password, username);
  const balanceDom = createDom(store);
  history.push(HOME_ROUTE);
  await sleep(2000);
  return balanceDom;
};

describe("DOM > Feature > Balance", () => {
  let store: Store<RootState>;
  let walletDom: React.Component;
  let profilePass: string;
  let profileUsername: string;

  beforeEach(async done => {
    profilePass = randomString(16);
    profileUsername = randomString(10);
    store = aNewStore();
    walletDom = await travelToBalance(store, profilePass, profileUsername);
    done();
  });

  afterEach(() => {
    shutdownSequence(null, store.getState);
  });

  // it("should contain only one field for password", async () => {
  //   const inputs = TestUtils.scryRenderedDOMComponentsWithTag(walletDom, "input");
  //   expect(inputs.length).toBe(1);
  // });

  mayTestBns(
    `should redirect to ${BALANCE_ROUTE} route`,
    async done => {
      expect(store.getState().router.location.pathname).toBe(BALANCE_ROUTE);
      // TODO: check content of page
      const form = TestUtils.scryRenderedDOMComponentsWithTag(walletDom, "form");
      expect(form.length).toEqual(0);

      done();
    },
    20000,
  );
});
