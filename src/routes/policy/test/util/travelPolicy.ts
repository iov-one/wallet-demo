import { Store } from "redux";
import { randomString } from "~/logic/testhelpers";
import { PRIVACY_POLICY_ROUTE } from "~/routes";
import { processBalance } from "~/routes/balance/test/util/travelBalance";
import { history } from "~/store";
import { whenOnNavigatedToRoute } from "~/utils/navigation";
import { createDom } from "~/utils/test/dom";

export const travelToPolicy = async (store: Store): Promise<React.Component> => {
  const account = randomString(6);
  await processBalance(store, account);

  history.push(PRIVACY_POLICY_ROUTE);

  const dom = createDom(store);

  await whenOnNavigatedToRoute(store, PRIVACY_POLICY_ROUTE);
  return dom;
};
