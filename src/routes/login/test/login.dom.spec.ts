import { UserProfile } from "@iov/keycontrol";
import { Store } from "redux";
// import * as profile from "~/logic/profile";
import { mayTestBns } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { BALANCE_ROUTE, LOGIN_ROUTE, SET_NAME_ROUTE } from "~/routes";
import { processBalance, travelToBalance } from "~/routes/balance/test/util/travelBalance";
import { TEST_PASS_PHRASE } from "~/routes/signupPass/test/utils/travelSignup";
import { getProfileDB } from "~/selectors";
import { shutdownSequence } from "~/sequences";
import { aNewStore, resetHistory } from "~/store";
import { expectRoute } from "~/utils/test/dom";
import { processLogin } from "./utils/travelLogin";

describe("DOM > Feature > Login", () => {
  let store: Store<RootState>;
  let refreshStore: Store<RootState>;

  beforeAll(async () => {
    store = aNewStore();
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

  mayTestBns(
    `should fail if user introduces incorrect password`,
    async () => {
      // GIVEN
      const loginDom = await travelToBalance(refreshStore);
      const db = getProfileDB(refreshStore.getState());
      const wrongPassword = "wrong password";
      const loadProfileSpy = jest.spyOn(UserProfile, "loadFrom");

      // WHEN
      expectRoute(refreshStore, LOGIN_ROUTE);
      await processLogin(loginDom, wrongPassword);

      // THEN
      expect(loadProfileSpy).toHaveBeenCalledTimes(1);
      expect(loadProfileSpy).toHaveBeenLastCalledWith(db, wrongPassword);
      await expect(UserProfile.loadFrom(db, wrongPassword)).rejects.toThrow("invalid usage");
      expectRoute(refreshStore, LOGIN_ROUTE);
    },
    30000,
  );
});
