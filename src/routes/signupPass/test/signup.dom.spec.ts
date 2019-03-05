import { Store } from "redux";
import { mayTestBns } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { SET_NAME_ROUTE, SIGNUP_ROUTE } from "~/routes";
import { shutdownSequence } from "~/sequences/boot";
import { aNewStore } from "~/store";
import { expectRoute } from "~/utils/test/dom";
import { processSignup, travelToSignup } from "../test/utils/travelSignup";

describe("DOM > Feature > Signup", () => {
  let store: Store<RootState>;
  beforeEach(() => {
    store = aNewStore();
  });
  afterEach(() => {
    shutdownSequence(null, store.getState);
  });
  mayTestBns(
    "creates account after filling form",
    async () => {
      const SignUpDom = await travelToSignup(store);
      expectRoute(store, SIGNUP_ROUTE);
      await processSignup(SignUpDom, store);
      expectRoute(store, SET_NAME_ROUTE);
    },
    10000,
  );
});
