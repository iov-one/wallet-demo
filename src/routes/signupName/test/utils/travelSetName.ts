import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { SIGNUP_ROUTE } from "~/routes";
import { history } from "~/store";
import { whenOnNavigatedToRoute } from "~/utils/navigation";
import { createDom } from "~/utils/test/dom";
import { sleep } from "~/utils/timer";

export const processSetName = async (
  SetNameDom: React.Component,
  account: string,
  refreshStore: Store,
): Promise<void> => {
  const inputs = TestUtils.scryRenderedDOMComponentsWithTag(SetNameDom, "input");
  expect(inputs.length).toBe(1);

  const accountNameField = inputs[0];
  TestUtils.Simulate.change(accountNameField, { target: { value: account } } as any);
  await sleep(2000);

  const form = TestUtils.findRenderedDOMComponentWithTag(SetNameDom, "form");
  if (!form) {
    throw new Error();
  }
  TestUtils.Simulate.submit(form);

  await whenOnNavigatedToRoute(refreshStore, SIGNUP_ROUTE);
};

export const travelToSetName = async (store: Store): Promise<React.Component> => {
  history.push(SIGNUP_ROUTE);

  const dom = createDom(store);
  await sleep(500);

  return dom;
};
