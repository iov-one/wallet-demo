import * as React from "react";
import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { mayTest, randomString } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { LOGIN_ROUTE, SET_NAME_ROUTE } from "~/routes";
import { signUp } from "~/routes/signupPass/container/signup.dom.spec";
import { shutdownSequence } from "~/sequences";
import { aNewStore, history } from "~/store";
import { sleep } from "~/utils/timer";

jest.setTimeout(60000);

export const travelToLogin = async (store: Store, password: string): Promise<React.Component> => {
  const signUpDom = await signUp(store, password);
  history.push(LOGIN_ROUTE);

  return signUpDom;
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

  mayTest("should contain only one field for password", async () => {
    const inputs = TestUtils.scryRenderedDOMComponentsWithTag(walletDom, "input");
    expect(inputs.length).toBe(1);
  });

  mayTest(`should redirect to ${SET_NAME_ROUTE} route after success login`, async (done) => {
    const inputs = TestUtils.scryRenderedDOMComponentsWithTag(walletDom, "input");

    const password = inputs[0];
    TestUtils.Simulate.change(password, { target: { value: profilePass } } as any);

    const form = TestUtils.findRenderedDOMComponentWithTag(walletDom, "form");
    if (!form) {
      throw new Error();
    }
    TestUtils.Simulate.submit(form);

    return sleep(3000)
      .then((_: any) => {
        expect(store.getState().router.location.pathname).toBe(SET_NAME_ROUTE);
        //expect(true).toBe(true);
        done();
      });    
  });
});
