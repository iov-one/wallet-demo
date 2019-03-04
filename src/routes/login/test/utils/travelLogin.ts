import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { BALANCE_ROUTE } from "~/routes";
import { whenOnNavigatedToRoute } from "~/utils/navigation";

export const fillLoginForm = (LoginDom: React.Component, password: string): void => {
  const inputs = TestUtils.scryRenderedDOMComponentsWithTag(LoginDom, "input");
  expect(inputs.length).toBe(1);
  const passwordInput = inputs[0];
  TestUtils.Simulate.change(passwordInput, { target: { value: password } } as any);

  const form = TestUtils.findRenderedDOMComponentWithTag(LoginDom, "form");
  if (!form) {
    throw new Error();
  }
  TestUtils.Simulate.submit(form);
};

export const processLogin = async (
  LoginDom: React.Component,
  password: string,
  store: Store,
): Promise<void> => {
  fillLoginForm(LoginDom, password);
  await whenOnNavigatedToRoute(store, BALANCE_ROUTE);
};
