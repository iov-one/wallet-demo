import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { mayTestBns, randomString } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { LOGIN_ROUTE } from "~/routes";
import { processBalance, travelToBalance } from "~/routes/balance/test/util/travelBalance";
import { shutdownSequence } from "~/sequences/boot";
import { aNewStore } from "~/store";
import { expectRoute, findRenderedDOMComponentWithId } from "~/utils/test/dom";
import { sleep } from "~/utils/timer";
import { LOG_OUT_ID, MENU_ID } from "../HiMenu/index";

describe("Components -> Header -> HiMenu", () => {
  let store: Store<RootState>;

  beforeEach(async () => {
    store = aNewStore();
    const account = randomString(6);
    try {
      await processBalance(store, account);
    } catch (e) {
      expect(e).toBeUndefined();
    }
  }, 25000);

  afterEach(() => {
    shutdownSequence(null, store.getState);
  });

  mayTestBns(
    `should redirect to ${LOGIN_ROUTE} route after clicking on "Logout" link in the menu`,
    async () => {
      const BalanceDom = await travelToBalance(store);

      const hiMenu = findRenderedDOMComponentWithId(BalanceDom, MENU_ID);
      TestUtils.Simulate.click(hiMenu);

      const logOutItem = findRenderedDOMComponentWithId(BalanceDom, LOG_OUT_ID);
      TestUtils.Simulate.click(logOutItem);

      await sleep(1500);
      expectRoute(store, LOGIN_ROUTE);
      const newStore = aNewStore();
      await sleep(1500);
      expect(store.getState()).toEqual(newStore.getState());
    },
    16000,
  );
});
