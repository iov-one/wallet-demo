import { Store } from "redux";
import { randomString } from "~/logic/testhelpers";
import { PRIVACY_POLICY_ROUTE } from "~/routes";
import { processBalance } from "~/routes/balance/test/util/travelBalance";
import { history } from "~/store";
import { createDom, expectRoute } from "~/utils/test/dom";
import { sleep } from "~/utils/timer";

export const travelToPolicy = async (store: Store): Promise<React.Component> => {
  const account = randomString(6);
  await processBalance(store, account);

  history.push(PRIVACY_POLICY_ROUTE);

  const dom = createDom(store);
  await sleep(500);

  expectRoute(store, PRIVACY_POLICY_ROUTE);

  return dom;
};
