import TestUtils from "react-dom/test-utils";
import { sleep } from "~/utils/timer";

export const processLogin = async (LoginDom: React.Component, password: string): Promise<void> => {
  const inputs = TestUtils.scryRenderedDOMComponentsWithTag(LoginDom, "input");
  expect(inputs.length).toBe(1);
  const passwordInput = inputs[0];
  TestUtils.Simulate.change(passwordInput, { target: { value: password } } as any);

  const form = TestUtils.findRenderedDOMComponentWithTag(LoginDom, "form");
  if (!form) {
    throw new Error();
  }
  TestUtils.Simulate.submit(form);

  await sleep(3000);
};
