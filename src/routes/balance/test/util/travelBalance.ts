import { Store } from "redux";
import { BALANCE_ROUTE, SET_NAME_ROUTE, SIGNUP_ROUTE } from "~/routes";
import { travelToHome } from "~/routes/home/test/utils/travelHome";
import { processSetName } from "~/routes/signupName/test/utils/travelSetName";
import { processSignup } from "~/routes/signupPass/test/utils/travelSignup";
import { history } from "~/store";
import { createDom, expectRoute } from "~/utils/test/dom";
import { sleep } from "~/utils/timer";

export const processBalance = async (store: Store): Promise<void> => {
  const HomeDom = await travelToHome(store);
  expectRoute(store, SIGNUP_ROUTE);
  const SignupDom = HomeDom;
  await processSignup(SignupDom);

  expectRoute(store, SET_NAME_ROUTE);
  const SetNameDom = SignupDom;
  await processSetName(SetNameDom);

  expectRoute(store, BALANCE_ROUTE);
};

export const travelToBalance = async (store: Store): Promise<React.Component> => {
  history.push(BALANCE_ROUTE);

  const dom = createDom(store);
  await sleep(500);
  return dom;
};
