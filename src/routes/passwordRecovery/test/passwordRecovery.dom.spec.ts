import { Store } from "redux";
import { mayTestBns, randomString } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { BALANCE_ROUTE, PASSWORD_RECOVERY_ROUTE } from "~/routes";
import { processBalance } from "~/routes/balance/test/util/travelBalance";
import { getWalletMnemonic } from "~/routes/securityPhrase/container/selector";
import { getAllAccounts } from "~/selectors";
import { shutdownSequence } from "~/sequences/boot";
import { aNewStore, resetHistory } from "~/store";
import { expectRoute } from "~/utils/test/dom";
import {
  checkRecoverProfileComponent,
  checkUpdatePassComponent,
  processProfileRecovery,
  processUpdatePass,
  travelToProfileRecovery,
} from "./util/passRecoveryUtils";

describe("DOM > Feature > Password Recovery", () => {
  let store: Store<RootState>;

  beforeEach(() => {
    resetHistory();
    store = aNewStore();
  });

  afterEach(() => {
    shutdownSequence(null, store.getState);
  });

  mayTestBns(
    "should recover same profille using mnemonic of new profile",
    async () => {
      await processBalance(store, randomString(10));
      const mnemonic = getWalletMnemonic(store.getState());
      const addresses: ReadonlyArray<string> = getAllAccounts(store.getState()).map(acct => acct.address);
      expect(mnemonic).toBeDefined();

      resetHistory();
      const freshStore = aNewStore();

      const PasswordRecoveryDom = await travelToProfileRecovery(freshStore);
      expectRoute(freshStore, PASSWORD_RECOVERY_ROUTE);

      await checkRecoverProfileComponent(PasswordRecoveryDom);
      await processProfileRecovery(PasswordRecoveryDom, mnemonic!.split(" "));

      await checkUpdatePassComponent(PasswordRecoveryDom, mnemonic!);
      const password = randomString(10);
      //Should redirect to BALANCE_ROUTE in case if everything is ok
      await processUpdatePass(PasswordRecoveryDom, password, password);

      expectRoute(freshStore, BALANCE_ROUTE);

      const mnemonicRecovered = getWalletMnemonic(freshStore.getState());
      expect(mnemonicRecovered).toBeDefined();
      expect(mnemonic).toBe(mnemonicRecovered);

      //Recovered addresses should be the same
      const addressesRecovered: ReadonlyArray<string> = getAllAccounts(store.getState()).map(
        acct => acct.address,
      );

      addressesRecovered.map((recoveredAddress: string) => expect(addresses).toContain(recoveredAddress));

      shutdownSequence(null, freshStore.getState);
    },
    40000,
  );
});
