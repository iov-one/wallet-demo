import { Store } from "redux";
import { mayTestBns } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { BALANCE_ROUTE, LOGIN_ROUTE, SET_NAME_ROUTE } from "~/routes";
import { processBalance, travelToBalance } from "~/routes/balance/test/util/travelBalance";
import { travelToHome } from "~/routes/home/test/utils/travelHome";
import { processSetName } from "~/routes/signupName/test/utils/travelSetName";
import { processSignup, TEST_PASS_PHRASE } from "~/routes/signupPass/test/utils/travelSignup";
import { shutdownSequence } from "~/sequences";
import { aNewStore, resetHistory } from "~/store";
import { expectRoute } from "~/utils/test/dom";
import { processLogin } from "./utils/travelLogin";

describe("DOM > Feature > Login", () => {
  let store: Store<RootState>;
  let refreshStore: Store<RootState>;
  let paralelStore: Store<RootState>;

  beforeAll(async () => {
    paralelStore = aNewStore();
    const SignupDom = await travelToHome(paralelStore);
    await processSignup(SignupDom);
    const SetNameDom = SignupDom;
    await processSetName(SetNameDom);

    console.log("login.dom.spec done setName. Continue beforeAll");
    resetHistory();
    store= aNewStore();
    await processBalance(store);
  }, 35000);

  beforeEach(() => {
    resetHistory();
    refreshStore = aNewStore({
      profile: {
        internal: {
          db: store.getState().profile.internal.db,
        },
      },
    });
  });

  afterEach(() => {
    shutdownSequence(null, refreshStore.getState);
  });

  afterAll(() => {
    shutdownSequence(null, store.getState);
    shutdownSequence(null, paralelStore.getState);
  });

  mayTestBns(
    `should redirect to ${SET_NAME_ROUTE} route after success login`,
    async () => {
      const loginDom = await travelToBalance(refreshStore);
      expectRoute(refreshStore, LOGIN_ROUTE);

      await processLogin(loginDom, TEST_PASS_PHRASE);
      expectRoute(refreshStore, BALANCE_ROUTE);
    },
    30000,
  );
});
