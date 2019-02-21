import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { mayTestBns } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { shutdownSequence } from "~/sequences/boot";
import { aNewStore } from "~/store";
import { TxTablePhoneInternal } from "../components/TxTable/TxTablePhone";
import { travelToTransactions } from "./util/travelTransactions";

describe("DOM > Feature > Transactions", () => {
  let store: Store<RootState>;

  beforeEach(() => {
    store = aNewStore();
  });

  afterEach(() => {
    shutdownSequence(null, store.getState);
  });

  mayTestBns(
    `should create Transactions component table`,
    async () => {
      const TxDom = await travelToTransactions(store);

      //Checks that TransactionsTable component is exists on the page
      const table = TestUtils.findRenderedComponentWithType(TxDom, TxTablePhoneInternal);
      expect(table.props.orderBy).toBe("Date");
      expect(table.props.order).toBe(-1);
      expect(table.props.txs).toEqual(store.getState().notification.transaction);
    },
    55000,
  );
});
