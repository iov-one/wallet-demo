import { Store } from "redux";
import { mayTestBns } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { BALANCE_ROUTE, SET_NAME_ROUTE, SIGNUP_ROUTE } from "~/routes";
import { travelToHome } from "~/routes/home/test/utils/travelHome";
import { processSetName } from "~/routes/signupName/test/utils/travelSetName";
import { processSignup } from "~/routes/signupPass/test/utils/travelSignup";
import { shutdownSequence } from "~/sequences";
import { aNewStore } from "~/store";
import { expectRoute } from "~/utils/test/dom";

describe("DOM > Feature > Travel to Balance", () => {
  let store: Store<RootState>;

  beforeEach(() => {
    store = aNewStore();
  });

  afterEach(() => {
    shutdownSequence(null, store.getState);
  });

  mayTestBns(`should redirect to ${BALANCE_ROUTE} route`, async () => {
    const HomeDom = await travelToHome(store);
    expectRoute(store, SIGNUP_ROUTE);
    const SignupDom = HomeDom;
    await processSignup(SignupDom);

    expectRoute(store, SET_NAME_ROUTE);
    const SetNameDom = SignupDom;
    await processSetName(SetNameDom);

    expectRoute(store, BALANCE_ROUTE);
  }, 16000);
});
