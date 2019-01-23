import { Store } from "redux";

import { mayTestBns } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { BALANCE_ROUTE, LOGIN_ROUTE, SET_NAME_ROUTE } from "~/routes";
import { processBalance, travelToBalance } from "~/routes/balance/test/util/travelBalance";
import { TEST_PASS_PHRASE } from "~/routes/signupPass/test/utils/travelSignup";
import { shutdownSequence } from "~/sequences";
import { aNewStore } from "~/store";
import { expectRoute } from "~/utils/test/dom";
import { processLogin } from "./utils/travelLogin";

describe("DOM > Feature > Login", () => {
  let store: Store<RootState>;
  let refreshStore: Store;

  beforeEach(() => {
    store = aNewStore();
    refreshStore = aNewStore();
  });

  afterEach(() => {
    shutdownSequence(null, store.getState);
  });

  mayTestBns(
    `should redirect to ${SET_NAME_ROUTE} route after success login`,
    async () => {
      await processBalance(store)

      const loginDom = await travelToBalance(refreshStore);
      expectRoute(refreshStore, LOGIN_ROUTE);

      processLogin(loginDom, TEST_PASS_PHRASE);
      expectRoute(refreshStore, BALANCE_ROUTE);
    },
    10000,
  );
});
