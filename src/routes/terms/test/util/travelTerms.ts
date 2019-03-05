import { Store } from "redux";
import { randomString } from "~/logic/testhelpers";
import { TERMS_OF_SERVICE_ROUTE } from "~/routes";
import { processBalance } from "~/routes/balance/test/util/travelBalance";
import { history } from "~/store";
import { whenOnNavigatedToRoute } from "~/utils/navigation";
import { createDom } from "~/utils/test/dom";

export const travelToTerms = async (store: Store): Promise<React.Component> => {
  const account = randomString(6);
  await processBalance(store, account);

  history.push(TERMS_OF_SERVICE_ROUTE);

  const dom = createDom(store);

  await whenOnNavigatedToRoute(store, TERMS_OF_SERVICE_ROUTE);
  return dom;
};
