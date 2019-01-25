import TestUtils from "react-dom/test-utils";
import { randomString } from "~/logic/testhelpers";
import { sleep } from "~/utils/timer";

export const processSetName = async (SetNameDom: React.Component): Promise<void> => {
  const addressName = randomString(6);
  console.log(`processSetName name to register -> ${addressName}`);
  const inputs = TestUtils.scryRenderedDOMComponentsWithTag(SetNameDom, "input");
  expect(inputs.length).toBe(1);

  const accountNameField = inputs[0];
  TestUtils.Simulate.change(accountNameField, { target: { value: addressName } } as any);
  await sleep(2000);

  const form = TestUtils.findRenderedDOMComponentWithTag(SetNameDom, "form");
  if (!form) {
    throw new Error();
  }
  TestUtils.Simulate.submit(form);

  await sleep(6000);
};
