import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { randomString } from "~/logic/testhelpers";
import { PASSWORD_RECOVERY_ROUTE } from "~/routes";
import { history } from "~/store";
import { createDom } from "~/utils/test/dom";
import { sleep } from "~/utils/timer";
import { PasswordRecoveryInternal } from "../../container";

export const processProfileRecovery = async (
  RecoveryDom: React.Component,
  mnemonic: ReadonlyArray<string>,
): Promise<void> => {
  const inputs = TestUtils.scryRenderedDOMComponentsWithTag(RecoveryDom, "input");

  for (let i = 0; i < mnemonic.length; i++) {
    TestUtils.Simulate.change(inputs[i], { target: { value: mnemonic[i] } } as any);
  }

  const form = TestUtils.findRenderedDOMComponentWithTag(RecoveryDom, "form");
  TestUtils.Simulate.submit(form);

  await sleep(3000);
};

export const travelToProfileRecovery = async (store: Store): Promise<React.Component> => {
  history.push(PASSWORD_RECOVERY_ROUTE);

  const dom = createDom(store);
  await sleep(500);

  return dom;
};

export const travelToUpdatePass = async (store: Store): Promise<React.Component> => {
  const dom = await travelToProfileRecovery(store);

  const mnemonic = getRealMnemonic();
  await processProfileRecovery(dom, mnemonic);

  const recoveryComponent = TestUtils.findRenderedComponentWithType(dom, PasswordRecoveryInternal);
  expect(recoveryComponent.state.step).toBe("recover_password");
  expect(recoveryComponent.state.mnemonic).toBe(mnemonic.join(" "));

  return dom;
};

export const processUpdatePass = async (
  RecoveryDom: React.Component,
  password: string,
  passwordConfirm: string,
  submitForm: boolean = true,
): Promise<void> => {
  const inputs = TestUtils.scryRenderedDOMComponentsWithTag(RecoveryDom, "input");

  TestUtils.Simulate.change(inputs[0], { target: { value: password } } as any);
  TestUtils.Simulate.change(inputs[1], { target: { value: passwordConfirm } } as any);

  if (submitForm) {
    const form = TestUtils.findRenderedDOMComponentWithTag(RecoveryDom, "form");
    TestUtils.Simulate.submit(form);
    await sleep(3500);
  }

  await sleep(1500);
};

export const getRandomMnemonic = (): ReadonlyArray<string> => {
  // tslint:disable-next-line:readonly-array
  const mnemonicList: string[] = [];
  for (let i = 0; i < 12; i++) {
    mnemonicList.push(randomString(10));
  }

  return mnemonicList;
};

export const getRealMnemonic = (): ReadonlyArray<string> => {
  return [
    "degree",
    "tackle",
    "suggest",
    "window",
    "test",
    "behind",
    "mesh",
    "extra",
    "cover",
    "prepare",
    "oak",
    "script",
  ];
};
