import { Store } from "redux";
import { mayTestBns } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { BALANCE_ROUTE } from "~/routes";
import { shutdownSequence } from "~/sequences";
import { aNewStore } from "~/store";
import { processBalance } from "./util/travelBalance";

describe("DOM > Feature > Travel to Balance", () => {
  let store: Store<RootState>;

  beforeEach(() => {
    store = aNewStore();
  });

  afterEach(() => {
    shutdownSequence(null, store.getState);
  });

  mayTestBns(`should redirect to ${BALANCE_ROUTE} route`, async () => {
    processBalance(store)
  }, 16000);
});
