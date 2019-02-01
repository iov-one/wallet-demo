import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { randomString } from "~/logic/testhelpers";
import { PASSWORD_RECOVERY_ROUTE } from "~/routes";
import { history } from "~/store";
import { createDom } from "~/utils/test/dom";
import { sleep } from "~/utils/timer";

export const processPassRecovery = async (RecoveryDom: React.Component, mnemonic: ReadonlyArray<string>): Promise<void> => {
  const inputs = TestUtils.scryRenderedDOMComponentsWithTag(RecoveryDom, "input");

  for (let i = 0; i < mnemonic.length; i++) {
    TestUtils.Simulate.change(inputs[i], { target: { value: mnemonic[i] } } as any);
  }

  const form = TestUtils.findRenderedDOMComponentWithTag(RecoveryDom, "form");
  if (!form) {
    throw new Error();
  }
  TestUtils.Simulate.submit(form);

  await sleep(3000);
}

export const travelToPassRecovery = async (store: Store): Promise<React.Component> => {
  history.push(PASSWORD_RECOVERY_ROUTE);

  const dom = createDom(store);
  await sleep(500);

  return dom;
};

export const getRandomMnemonic = (): ReadonlyArray<string> => {
  // tslint:disable-next-line:readonly-array
  const mnemonicList: string[] = [];
  for (let i = 0; i < 12; i++) {
    mnemonicList.push(randomString(10));
  }

  return mnemonicList;
}


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
    "script"
  ];
} 
