import { Ed25519HdWallet } from "@iov/keycontrol";
import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
//import { mayTestBns } from "~/logic/testhelpers";
import { Toast } from "~/context/ToastProvider/Toast";
import { RootState } from "~/reducers";
import { shutdownSequence } from "~/sequences";
import { aNewStore, resetHistory } from "~/store";
import { PasswordRecoveryInternal } from "../container/index";
import { getRandomMnemonic, getRealMnemonic, processPassRecovery, travelToPassRecovery } from "./util/travelPassRecovery";

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

  it(
    "should have 12 input fields",
    async () => {
      const PassRecoveryDom = await travelToPassRecovery(refreshStore);
      const inputs = TestUtils.scryRenderedDOMComponentsWithTag(PassRecoveryDom, "input");
      expect(inputs.length).toBe(12);
    },
    16000,
  );

  it(
    `should create wallet from mnemonic`,
    async () => {
      const PassRecoveryDom = await travelToPassRecovery(refreshStore);
      const hdWalletSpy = jest.spyOn(Ed25519HdWallet, "fromMnemonic");

      const mnemonic = getRandomMnemonic();
      await processPassRecovery(PassRecoveryDom, mnemonic);

      expect(hdWalletSpy).toHaveBeenCalledTimes(1);
      expect(hdWalletSpy).toHaveBeenLastCalledWith(mnemonic.join(" "));
    },
    16000,
  );

  it(
    `should show toast in case of wrong mnemonics`,
    async () => {
      const PassRecoveryDom = await travelToPassRecovery(refreshStore);

      const mnemonic = getRandomMnemonic();
      await processPassRecovery(PassRecoveryDom, mnemonic);

      const toastComponent = TestUtils.findRenderedComponentWithType(PassRecoveryDom, Toast);
      //console.log(toastComponent.props);
      expect(toastComponent.props.open).toBe(true);
      expect(toastComponent.props.message).toBe("The recovery phrase you entered is invalid");
      expect(toastComponent.props.variant).toBe("error");
    },
    16000,
  );

  it(
    `should not show toast in case if mnemonics are right`,
    async () => {
      const PassRecoveryDom = await travelToPassRecovery(refreshStore);

      const mnemonic = getRealMnemonic();
      await processPassRecovery(PassRecoveryDom, mnemonic);

      const toastComponent = TestUtils.findRenderedComponentWithType(PassRecoveryDom, Toast);
      expect(toastComponent.props.open).toBe(false);
    },
    16000,
  );

  it(
    `should redirect to second step of password recovery`,
    async () => {
      const PassRecoveryDom = await travelToPassRecovery(refreshStore);

      const mnemonic = getRealMnemonic();
      await processPassRecovery(PassRecoveryDom, mnemonic);

      const recoveryComponent = TestUtils.findRenderedComponentWithType(PassRecoveryDom, PasswordRecoveryInternal);
      expect(recoveryComponent.state.step).toBe("recover_password");
    },
    16000,
  );
});
