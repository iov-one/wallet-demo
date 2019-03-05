import { UserProfile } from "@iov/keycontrol";
import { Store } from "redux";
import { mayTestBns, randomString } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { BALANCE_ROUTE, LOGIN_ROUTE } from "~/routes";
import { processBalance, travelToBalance } from "~/routes/balance/test/util/travelBalance";
import { TEST_PASS_PHRASE } from "~/routes/signupPass/test/utils/travelSignup";
import { getProfileDB } from "~/selectors";
import { shutdownSequence } from "~/sequences/boot";
import { aNewStore, resetHistory } from "~/store";
import { expectRoute } from "~/utils/test/dom";
import { sleep } from "~/utils/timer";
import { fillLoginForm, processLogin } from "./utils/travelLogin";

describe("DOM > Feature > Login", () => {
  let store: Store<RootState>;

  beforeAll(async () => {
    store = aNewStore();
    const account = randomString(6);
    await processBalance(store, account);
  }, 35000);

  afterAll(() => {
    shutdownSequence(null, store.getState);
  });

  mayTestBns(
    `should redirect to ${BALANCE_ROUTE} route after success login`,
    async () => {
      resetHistory();
      const refreshStore = aNewStore({
        profile: {
          internal: {
            db: store.getState().profile.internal.db,
          },
        },
      });
      const loginDom = await travelToBalance(refreshStore);
      expectRoute(refreshStore, LOGIN_ROUTE);

      await processLogin(loginDom, TEST_PASS_PHRASE, refreshStore);
      expectRoute(refreshStore, BALANCE_ROUTE);
      shutdownSequence(null, refreshStore.getState);
    },
    30000,
  );

  mayTestBns(
    `should fail if user introduces incorrect password`,
    async () => {
      // GIVEN
      resetHistory();
      const refreshStore = aNewStore({
        profile: {
          internal: {
            db: store.getState().profile.internal.db,
          },
        },
      });
      const loginDom = await travelToBalance(refreshStore);
      const db = getProfileDB(refreshStore.getState());
      const wrongPassword = "wrong password";
      const loadProfileSpy = jest.spyOn(UserProfile, "loadFrom");

      // WHEN
      expectRoute(refreshStore, LOGIN_ROUTE);
      await fillLoginForm(loginDom, wrongPassword);
      // Needed time to try to load the profile
      await sleep(5000);

      // THEN
      expect(loadProfileSpy).toHaveBeenCalledTimes(1);
      expect(loadProfileSpy).toHaveBeenLastCalledWith(db, wrongPassword);
      await expect(UserProfile.loadFrom(db, wrongPassword)).rejects.toThrow("invalid usage");
      expectRoute(refreshStore, LOGIN_ROUTE);
    },
    30000,
  );
});
