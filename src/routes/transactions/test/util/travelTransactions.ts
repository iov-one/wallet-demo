import { Store } from "redux";
import { randomString } from "~/logic/testhelpers";
import { TRANSACTIONS_ROUTE } from "~/routes";
import { processBalance } from "~/routes/balance/test/util/travelBalance";
import { history } from "~/store";
import { createDom, expectRoute } from "~/utils/test/dom";
import { sleep } from "~/utils/timer";

export const travelToTransactions = async (store: Store): Promise<React.Component> => {
  const account = randomString(6);
  await processBalance(store, account);

  history.push(TRANSACTIONS_ROUTE);

  const dom = createDom(store);
  await sleep(500);

  expectRoute(store, TRANSACTIONS_ROUTE);

  return dom;
};
