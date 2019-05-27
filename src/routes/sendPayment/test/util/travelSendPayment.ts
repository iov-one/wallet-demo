import TestUtils from "react-dom/test-utils";
import { Form, FormProps } from "react-final-form";
import * as sendPaymentValidatorModule from "~/routes/sendPayment/container/validator";
import { sleep } from "~/utils/timer";

export const processPaymentTo = async (
  SendPaymentDom: React.Component,
  recipientIovAccount: string,
  quantity: string,
): Promise<void> => {
  const inputs = TestUtils.scryRenderedDOMComponentsWithTag(SendPaymentDom, "input");
  expect(inputs.length).toBe(3);

  const sendPaymentForm = TestUtils.findRenderedComponentWithType(
    SendPaymentDom,
    Form as React.ComponentClass<FormProps>,
  );

  const amount = inputs[0];
  TestUtils.Simulate.change(amount, { target: { value: quantity } } as any);
  const recipient = inputs[2];
  TestUtils.Simulate.change(recipient, { target: { value: "badAddress" } } as any);
  await sleep(800);
  expect(sendPaymentForm.state.state.errors.recipient).toMatch(/Invalid address for/);

  const validationMock = jest.spyOn(sendPaymentValidatorModule, "isRecipientRegistered");
  validationMock.mockImplementationOnce((_: any, __: any) => false);

  TestUtils.Simulate.change(recipient, { target: { value: recipientIovAccount } } as any);
  await sleep(800);
  expect(sendPaymentForm.state.state.errors.recipient).toMatch(/IOV address is not registered/);

  validationMock.mockRestore();

  // Force form to be validated
  TestUtils.Simulate.change(amount, { target: { value: "0" } } as any);
  TestUtils.Simulate.change(amount, { target: { value: quantity } } as any);
  await sleep(800);

  expect(sendPaymentForm.state.state.errors).toEqual({});

  const form = TestUtils.findRenderedDOMComponentWithTag(SendPaymentDom, "form");
  TestUtils.Simulate.submit(form);

  await sleep(800);
};

export const processConfirmation = async (SendPaymentDom: React.Component): Promise<void> => {
  const buttons = TestUtils.scryRenderedDOMComponentsWithTag(SendPaymentDom, "button");
  expect(buttons.length).toBe(2);

  const continueButton = buttons[0];
  expect(continueButton.textContent).toBe("Continue");

  TestUtils.Simulate.click(continueButton);

  await sleep(800);
};
