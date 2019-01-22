import { Store } from "redux";
import { mayTestBns } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { SET_NAME_ROUTE, SIGNUP_ROUTE } from "~/routes";
import { shutdownSequence } from "~/sequences";
import { aNewStore } from "~/store";
import { sleep } from "~/utils/timer";
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

      await sleep(300);
      expect(store.getState().router.location.pathname).toBe(SIGNUP_ROUTE);

      await processSignup(SignUpDom);

      expect(store.getState().router.location.pathname).toBe(SET_NAME_ROUTE);
    },
    10000,
  );
});
