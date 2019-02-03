import { Ed25519HdWallet } from "@iov/keycontrol";
import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { Toast } from "~/context/ToastProvider/Toast";
import { mayTestBns, randomString } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { SET_NAME_ROUTE } from "~/routes";
import { shutdownSequence } from "~/sequences";
import { aNewStore, resetHistory } from "~/store";
import { expectRoute } from "~/utils/test/dom";
import {
  getRandomMnemonic,
  getRealMnemonic,
  PasswordFormData,
  processProfileRecovery,
  processUpdatePass,
  travelToProfileRecovery,
  travelToUpdatePass,
} from "./util/travelPassRecovery";

describe("DOM > Feature > Password Recovery", () => {
  let store: Store<RootState>;
  let refreshStore: Store<RootState>;

  beforeAll(async () => {
    store = aNewStore();
  }, 35000);

  beforeEach(() => {
    resetHistory();
    refreshStore = aNewStore();
  });

  afterEach(() => {
    shutdownSequence(null, refreshStore.getState);
  });

  afterAll(() => {
    shutdownSequence(null, store.getState);
  });

  describe("First step", () => {
    it("should have 12 input fields", async () => {
      const RecoverProfileDom = await travelToProfileRecovery(refreshStore);
      const inputs = TestUtils.scryRenderedDOMComponentsWithTag(RecoverProfileDom, "input");
      expect(inputs.length).toBe(12);
    }, 16000);

    it(`should create wallet from mnemonic`, async () => {
      const RecoverProfileDom = await travelToProfileRecovery(refreshStore);
      const hdWalletSpy = jest.spyOn(Ed25519HdWallet, "fromMnemonic");

      const mnemonic = getRandomMnemonic();
      await processProfileRecovery(RecoverProfileDom, mnemonic);

      expect(hdWalletSpy).toHaveBeenCalledTimes(1);
      expect(hdWalletSpy).toHaveBeenLastCalledWith(mnemonic.join(" "));
    }, 16000);

    it(`should show toast in case of wrong mnemonics`, async () => {
      const RecoverProfileDom = await travelToProfileRecovery(refreshStore);

      const mnemonic = getRandomMnemonic();
      await processProfileRecovery(RecoverProfileDom, mnemonic);

      const toastComponent = TestUtils.findRenderedComponentWithType(RecoverProfileDom, Toast);
      expect(toastComponent.props.open).toBeTruthy();
      expect(toastComponent.props.message).toBe("The recovery phrase you entered is invalid");
      expect(toastComponent.props.variant).toBe("error");
    }, 16000);

    it(`should not show toast in case if mnemonics are right`, async () => {
      const RecoverProfileDom = await travelToProfileRecovery(refreshStore);

      const mnemonic = getRealMnemonic();
      await processProfileRecovery(RecoverProfileDom, mnemonic);

      const toastComponent = TestUtils.findRenderedComponentWithType(RecoverProfileDom, Toast);
      expect(toastComponent.props.open).toBeFalsy();
    }, 16000);
  });

  describe("Second step", () => {
    it("should have 2 input fields", async () => {
      const UpdatePassDom = await travelToUpdatePass(refreshStore);
      const inputs = TestUtils.scryRenderedDOMComponentsWithTag(UpdatePassDom, "input");
      expect(inputs.length).toBe(2);
    }, 16000);

    it("submit should be disabled if input fields are empty", async () => {
      const UpdatePassDom = await travelToUpdatePass(refreshStore);

      const button = TestUtils.findRenderedDOMComponentWithTag(UpdatePassDom, "button") as HTMLButtonElement;
      expect(button.disabled).toBeTruthy();
    }, 16000);

    it("submit should be disabled if input fields values are not equal", async () => {
      const passwords: PasswordFormData = {
        password: randomString(10),
        passwordConfirm: randomString(10),
      };

      const UpdatePassDom = await travelToUpdatePass(refreshStore);
      await processUpdatePass(UpdatePassDom, passwords);

      const button = TestUtils.findRenderedDOMComponentWithTag(UpdatePassDom, "button") as HTMLButtonElement;
      expect(button.disabled).toBeTruthy();
    }, 16000);

    it("submit should be enabled if input fields values are equal", async () => {
      const password = randomString(10);
      const passwords: PasswordFormData = {
        password: password,
        passwordConfirm: password,
      };

      const UpdatePassDom = await travelToUpdatePass(refreshStore);
      await processUpdatePass(UpdatePassDom, passwords, false);

      const button = TestUtils.findRenderedDOMComponentWithTag(UpdatePassDom, "button") as HTMLButtonElement;
      expect(button.disabled).toBeFalsy();
    }, 16000);

    mayTestBns(
      `should submit password and redirect to ${SET_NAME_ROUTE}`,
      async () => {
        const password = randomString(10);
        const passwords: PasswordFormData = {
          password: password,
          passwordConfirm: password,
        };

        const UpdatePassDom = await travelToUpdatePass(refreshStore);
        await processUpdatePass(UpdatePassDom, passwords);

        expectRoute(refreshStore, SET_NAME_ROUTE);
      },
      16000,
    );
  });
});
