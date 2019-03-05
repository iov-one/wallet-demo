import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { mayTestBns, randomString } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { LOGIN_ROUTE, TERMS_OF_SERVICE_ROUTE } from "~/routes";
import { processBalance, travelToBalance } from "~/routes/balance/test/util/travelBalance";
import { shutdownSequence } from "~/sequences/boot";
import { aNewStore } from "~/store";
import { whenOnNavigatedToRoute } from "~/utils/navigation";
import { findRenderedDOMComponentWithId } from "~/utils/test/dom";
import { sleep } from "~/utils/timer";
import { LOG_OUT_ID, MENU_ID, TERMS_CONDITIONS_ID } from "../HiMenu/index";

describe("Components -> Header -> HiMenu", () => {
  let store: Store<RootState>;

  beforeEach(async () => {
    store = aNewStore();
    const account = randomString(6);
    await processBalance(store, account);
  }, 25000);

  afterEach(() => {
    shutdownSequence(null, store.getState);
  });

  mayTestBns(
    `should redirect to approprite route when clicking on it`,
    async () => {
      const BalanceDom = await travelToBalance(store);

      let hiMenu = findRenderedDOMComponentWithId(BalanceDom, MENU_ID);
      TestUtils.Simulate.click(hiMenu);
      const termsItem = findRenderedDOMComponentWithId(BalanceDom, TERMS_CONDITIONS_ID);
      TestUtils.Simulate.click(termsItem);
      await whenOnNavigatedToRoute(store, TERMS_OF_SERVICE_ROUTE);

      hiMenu = findRenderedDOMComponentWithId(BalanceDom, MENU_ID);
      TestUtils.Simulate.click(hiMenu);
      const logOutItem = findRenderedDOMComponentWithId(BalanceDom, LOG_OUT_ID);
      TestUtils.Simulate.click(logOutItem);

      await whenOnNavigatedToRoute(store, LOGIN_ROUTE);
      const newStore = aNewStore();
      await sleep(1500);
      expect(store.getState()).toEqual(newStore.getState());
    },
    16000,
  );
});
