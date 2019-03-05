import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { mayTestBns, randomString } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { RECEIVE_FROM_IOV_USER, RECEIVE_FROM_NON_IOV_USER } from "~/routes";
import { processBalance } from "~/routes/balance/test/util/travelBalance";
import { shutdownSequence } from "~/sequences/boot";
import { aNewStore, history } from "~/store";
import { whenOnNavigatedToRoute } from "~/utils/navigation";

describe("DOM > Feature > Send Payment", () => {
  let store: Store<RootState>;
  let BalanceDom: React.Component;

  beforeAll(async () => {
    store = aNewStore();
    const account = randomString(10);
    BalanceDom = await processBalance(store, account);
  }, 30000);

  afterAll(() => {
    shutdownSequence(null, store.getState);
  });

  mayTestBns(
    "should go to receive payments",
    async () => {
      const cards = TestUtils.scryRenderedDOMComponentsWithClass(BalanceDom, "BalanceLayout-action-212");
      expect(cards.length).toBe(2);
      const receivePaymentCard = cards[1];
      expect(receivePaymentCard.textContent).toBe("Receive Payment");
      TestUtils.Simulate.click(receivePaymentCard);
      await whenOnNavigatedToRoute(store, RECEIVE_FROM_IOV_USER);

      history.push(RECEIVE_FROM_NON_IOV_USER);
      await whenOnNavigatedToRoute(store, RECEIVE_FROM_NON_IOV_USER);
    },
    90000,
  );
});
