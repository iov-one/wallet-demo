import { MultiChainSigner } from "@iov/core";
import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { mayTestBns, randomString } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { LOGIN_ROUTE } from "~/routes";
import { processBalance, travelToBalance } from "~/routes/balance/test/util/travelBalance";
import { getSigner } from "~/selectors";
import { shutdownSequence } from "~/sequences";
import { aNewStore } from "~/store";
import { expectRoute, findRenderedDOMComponentWithId } from "~/utils/test/dom";
import { sleep } from "~/utils/timer";
import { LOG_OUT_ID, MENU_ID } from "../HiMenu/index";

describe("Components -> Header -> HiMenu", () => {
  let store: Store<RootState>;
  let signer: MultiChainSigner | undefined;

  beforeEach(async () => {
    store = aNewStore();
    const account = randomString(6);
    await processBalance(store, account);
    signer = getSigner(store.getState());
  }, 16000);

  afterEach(() => {
    shutdownSequence(null, store.getState);
    if (signer) {
      signer.shutdown();
    }
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
    },
    16000,
  );
});