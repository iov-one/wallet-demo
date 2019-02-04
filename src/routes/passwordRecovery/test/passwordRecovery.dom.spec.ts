import { Ed25519HdWallet } from "@iov/keycontrol";
import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { Toast } from "~/context/ToastProvider/Toast";
import { mayTestBns, randomString } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { PASSWORD_RECOVERY_ROUTE, SET_NAME_ROUTE } from "~/routes";
import { processBalance } from "~/routes/balance/test/util/travelBalance";
import { shutdownSequence } from "~/sequences";
import { aNewStore, resetHistory } from "~/store";
import { expectRoute } from "~/utils/test/dom";
import {
  getRandomMnemonic,
  getRealMnemonic,
  processProfileRecovery,
  processUpdatePass,
  travelToProfileRecovery,
  travelToUpdatePass,
} from "./util/travelPassRecovery";

describe("DOM > Feature > Password Recovery", () => {
  let store: Store<RootState>;

  beforeEach(() => {
    resetHistory();
    store = aNewStore();
  });

  afterEach(() => {
    shutdownSequence(null, store.getState);
  });

  describe("First step", () => {
    it(
      "should have 12 input fields, create wallet from mnemonic and show toast in case of wrong mnemonic",
      async () => {
        const RecoverProfileDom = await travelToProfileRecovery(store);
        expectRoute(store, PASSWORD_RECOVERY_ROUTE);

        const hdWalletSpy = jest.spyOn(Ed25519HdWallet, "fromMnemonic");
        const inputs = TestUtils.scryRenderedDOMComponentsWithTag(RecoverProfileDom, "input");
        //Check input fields amount
        expect(inputs.length).toBe(12);

        const mnemonic = getRandomMnemonic();
        await processProfileRecovery(RecoverProfileDom, mnemonic);

        //Check for opened toast message
        const toastComponent = TestUtils.findRenderedComponentWithType(RecoverProfileDom, Toast);
        expect(toastComponent.props.open).toBeTruthy();
        expect(toastComponent.props.message).toBe("The recovery phrase you entered is invalid");
        expect(toastComponent.props.variant).toBe("error");

        //Check for mnemonic processing
        expect(hdWalletSpy).toHaveBeenCalledTimes(1);
        expect(hdWalletSpy).toHaveBeenLastCalledWith(mnemonic.join(" "));

        //Check that toast is hidden in case of mnemonic are real
        const realMnemonic = getRealMnemonic();
        await processProfileRecovery(RecoverProfileDom, realMnemonic);
        expect(toastComponent.props.open).toBeFalsy();
      }, 16000);
  });



  describe("Second step", () => {
    mayTestBns(
      "should have 2 input fields, submit should be disabled if empty or not equal fields and should redirect to SET_NAME_ROUTE on success",
      async () => {
        const UpdatePassDom = await travelToUpdatePass(store);
        const inputs = TestUtils.scryRenderedDOMComponentsWithTag(UpdatePassDom, "input");
        //Check input fields amount
        expect(inputs.length).toBe(2);

        const button = TestUtils.findRenderedDOMComponentWithTag(UpdatePassDom, "button") as HTMLButtonElement;

        //Submit button should be disabled in case if password fields are empty
        expect(button.disabled).toBeTruthy();

        //Submit button should be disabled in case if password fields are not equal
        await processUpdatePass(UpdatePassDom, randomString(10), randomString(10));
        expect(button.disabled).toBeTruthy();

        //Submit button should be enabled in case if password fields are equal
        const password = randomString(10);
        await processUpdatePass(UpdatePassDom, password, password, false);
        expect(button.disabled).toBeFalsy();

        //Should redirect to SET_NAME_ROUTE in case if everything is ok
        await processUpdatePass(UpdatePassDom, password, password);
        expectRoute(store, SET_NAME_ROUTE);
      }, 25000);

    mayTestBns(
      "should return same mnemonic after restoration",
      async () => {
        await processBalance(store, randomString(10));
        let profile = store.getState().profile.internal.profile;

        const mnemonic = profile!.printableSecret(profile!.wallets.value[0].id);

        shutdownSequence(null, store.getState);
        resetHistory();
        store = aNewStore();

        const RecoverProfileDom = await travelToProfileRecovery(store);
        await processProfileRecovery(RecoverProfileDom, mnemonic.split(" "));

        const password = randomString(10);
        await processUpdatePass(RecoverProfileDom, password, password);

        profile = store.getState().profile.internal.profile;

        expect(mnemonic).toBe(profile!.printableSecret(profile!.wallets.value[0].id));
      }, 40000);
  });
});
