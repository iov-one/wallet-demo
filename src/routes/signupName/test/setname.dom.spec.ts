import { Store } from "redux";
import { mayTestBns, randomString } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { SET_NAME_ROUTE, SIGNUP_ROUTE } from "~/routes";
import { processBalance } from "~/routes/balance/test/util/travelBalance";
import * as SetNameForm from "~/routes/signupName/components/FormComponent";
import { processSignup } from "~/routes/signupPass/test/utils/travelSignup";
import { shutdownSequence } from "~/sequences/boot";
import { aNewStore, resetHistory } from "~/store";
import { expectRoute } from "~/utils/test/dom";
import { travelToSetName, submitSetNameForm } from "./utils/travelSetName";

describe("DOM > Feature > Signup - setname", () => {
  let store: Store<RootState>;
  let refreshStore: Store<RootState>;
  let account: string;

  beforeEach(async () => {
    store = aNewStore();
    account = randomString(6);
    await processBalance(store, account);
    resetHistory();
    refreshStore = aNewStore();
  }, 35000);

  afterEach(() => {
    shutdownSequence(null, refreshStore.getState);
    shutdownSequence(null, store.getState);
  });

  mayTestBns(
    "should fail if user uses an already registered account name",
    async () => {
      const SignUpDom = await travelToSetName(refreshStore);
      expectRoute(refreshStore, SIGNUP_ROUTE);
      await processSignup(SignUpDom, refreshStore);
      expectRoute(refreshStore, SET_NAME_ROUTE);

      const takenNameSpy = jest.spyOn(SetNameForm, "nameValidator");
      await submitSetNameForm(SignUpDom, account);

      expect(takenNameSpy).toHaveBeenCalled();
      expect(takenNameSpy).toHaveLastReturnedWith("Name is already taken");
      expectRoute(refreshStore, SET_NAME_ROUTE);
    },
    45000,
  );
});
