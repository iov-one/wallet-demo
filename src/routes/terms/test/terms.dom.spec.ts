import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { mayTestBns } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { shutdownSequence } from "~/sequences/boot";
import { aNewStore } from "~/store";
import Terms from "../container";
import { travelToTerms } from "./util/travelTerms";

describe("DOM > Feature > Privacy Policy", () => {
  let store: Store<RootState>;

  beforeEach(() => {
    store = aNewStore();
  });

  afterEach(() => {
    shutdownSequence(null, store.getState);
  });

  mayTestBns(
    `should create Terms of Service layout component table`,
    async () => {
      const TxDom = await travelToTerms(store);

      //Checks that Terms component is exists on the page
      TestUtils.findRenderedComponentWithType(TxDom, Terms);
    },
    55000,
  );
});
