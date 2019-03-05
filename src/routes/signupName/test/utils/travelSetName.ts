import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { BALANCE_ROUTE, SIGNUP_ROUTE } from "~/routes";
import { history } from "~/store";
import { whenOnNavigatedToRoute } from "~/utils/navigation";
import { createDom } from "~/utils/test/dom";
import { sleep } from "~/utils/timer";

export const submitSetNameForm = async (SetNameDom: React.Component, account: string): Promise<void> => {
  const inputs = TestUtils.scryRenderedDOMComponentsWithTag(SetNameDom, "input");
  expect(inputs.length).toBe(1);

  const accountNameField = inputs[0];
  TestUtils.Simulate.change(accountNameField, { target: { value: account } } as any);
  await sleep(2000);

  const form = TestUtils.findRenderedDOMComponentWithTag(SetNameDom, "form");
  TestUtils.Simulate.submit(form);
  await sleep(500);
};

export const processSetName = async (
  SetNameDom: React.Component,
  account: string,
  store: Store,
): Promise<void> => {
  await submitSetNameForm(SetNameDom, account);
  await whenOnNavigatedToRoute(store, BALANCE_ROUTE);
};

export const travelToSetName = async (store: Store): Promise<React.Component> => {
  history.push(SIGNUP_ROUTE);

  const dom = createDom(store);
  await sleep(500);

  return dom;
};
