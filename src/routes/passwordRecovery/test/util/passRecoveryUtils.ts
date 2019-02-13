import { Ed25519HdWallet } from "@iov/keycontrol";
import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { Toast } from "~/context/ToastProvider/Toast";
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

export const checkRecoverProfileComponent = async (dom: React.Component, mnemonic: string): Promise<void> => {
  const hdWalletSpy = jest.spyOn(Ed25519HdWallet, "fromMnemonic");
  const mnemonicInputs = TestUtils.scryRenderedDOMComponentsWithTag(dom, "input");
  //Check mnemonic input fields amount
  expect(mnemonicInputs.length).toBe(12);

  const randomMnemonic = getRandomMnemonic();
  await processProfileRecovery(dom, randomMnemonic);

  //Check for opened toast message
  const toastComponent = TestUtils.findRenderedComponentWithType(dom, Toast);
  expect(toastComponent.props.open).toBeTruthy();
  expect(toastComponent.props.message).toBe("The recovery phrase you entered is invalid");
  expect(toastComponent.props.variant).toBe("error");

  //Check for mnemonic processing
  expect(hdWalletSpy).toHaveBeenCalledTimes(1);
  expect(hdWalletSpy).toHaveBeenLastCalledWith(randomMnemonic.join(" "));
};

export const checkUpdatePassComponent = async (dom: React.Component, mnemonic: string): Promise<void> => {
  //Checks that Component point to second page of recovering process
  const recoveryComponent = TestUtils.findRenderedComponentWithType(dom, PasswordRecoveryInternal);
  expect(recoveryComponent.state.step).toBe("recover_password");
  expect(recoveryComponent.state.mnemonic).toBe(mnemonic);

  const inputs = TestUtils.scryRenderedDOMComponentsWithTag(dom, "input");
  //Check new password input fields amount
  expect(inputs.length).toBe(2);

  const button = TestUtils.findRenderedDOMComponentWithTag(dom, "button") as HTMLButtonElement;

  //Submit button should be disabled in case if password fields are empty
  expect(button.disabled).toBeTruthy();

  //Submit button should be disabled in case if password fields are not equal
  await processUpdatePass(dom, randomString(10), randomString(10));
  expect(button.disabled).toBeTruthy();

  //Submit button should be enabled in case if password fields are equal
  const password = randomString(10);
  await processUpdatePass(dom, password, password, false);
  expect(button.disabled).toBeFalsy();
};

export const getRandomMnemonic = (): ReadonlyArray<string> => {
  const mnemonicList = new Array(12);

  return mnemonicList.map(() => randomString(10));
};
