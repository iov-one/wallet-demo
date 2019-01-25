import { Store } from "redux";
import { HOME_ROUTE } from "~/routes";
import { history } from "~/store";
import { createDom } from "~/utils/test/dom";
import { sleep } from "~/utils/timer";

export const travelToHome = async (store: Store): Promise<React.Component> => {
  history.push(HOME_ROUTE);

  const dom = createDom(store);
  await sleep(500);
  return dom;
};
