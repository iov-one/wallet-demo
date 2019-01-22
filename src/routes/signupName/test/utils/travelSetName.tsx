import TestUtils from "react-dom/test-utils";
import { randomString } from "~/logic/testhelpers";
import { sleep } from "~/utils/timer";


export const processSetName = async (SetNameDom: React.Component): Promise<void> => {
  const addressName = randomString(16);
  const inputs = TestUtils.scryRenderedDOMComponentsWithTag(SetNameDom, "input");
  expect(inputs.length).toBe(1);

  const accountNameField = inputs[0];
  TestUtils.Simulate.change(accountNameField, { target: { value: addressName } } as any);

  const form = TestUtils.findRenderedDOMComponentWithTag(SetNameDom, "form");
  if (!form) {
    throw new Error();
  }
  TestUtils.Simulate.submit(form);

  await sleep(6000);
}