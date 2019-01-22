import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { SIGNUP_ROUTE } from "~/routes";
import { history } from "~/store";
import { createDom } from "~/utils/test/dom";
import { sleep } from "~/utils/timer";

export const processSignup = async (SignUpDom: React.Component): Promise<void> => {
  const inputs = TestUtils.scryRenderedDOMComponentsWithTag(SignUpDom, "input");
  expect(inputs.length).toBe(4);

  const email = inputs[0];
  TestUtils.Simulate.change(email, { target: { value: "foo@bar.com" } } as any);

  const password = inputs[1];
  TestUtils.Simulate.change(password, { target: { value: "pass phrase here" } } as any);

  const repeatPassword = inputs[2];
  TestUtils.Simulate.change(repeatPassword, { target: { value: "pass phrase here" } } as any);

  const accept = inputs[3];
  TestUtils.Simulate.change(accept, { target: { value: "true" } } as any);

  const form = TestUtils.findRenderedDOMComponentWithTag(SignUpDom, "form");
  if (!form) {
    throw new Error();
  }
  TestUtils.Simulate.submit(form);

  await sleep(3000);
}

export const travelToSignup = (store: Store): React.Component => {
  history.push(SIGNUP_ROUTE);

  return createDom(store);
};
