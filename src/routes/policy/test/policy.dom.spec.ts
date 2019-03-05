import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { mayTestBns } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { shutdownSequence } from "~/sequences/boot";
import { aNewStore } from "~/store";
import { PolicyLayoutInternal } from "../components";
import { travelToPolicy } from "./util/travelPolicy";

describe("DOM > Feature > Transactions", () => {
  let store: Store<RootState>;

  beforeEach(() => {
    store = aNewStore();
  });

  afterEach(() => {
    shutdownSequence(null, store.getState);
  });

  mayTestBns(
    `should create Policy layout component table`,
    async () => {
      const TxDom = await travelToPolicy(store);

      //Checks that PolicyLayout component is exists on the page
      TestUtils.findRenderedComponentWithType(TxDom, PolicyLayoutInternal);
    },
    55000,
  );
});
