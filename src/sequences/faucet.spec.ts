import { compareAmounts } from "~/logic";
import { faucetSpecs, mayTestFull, randomString, testChains, testSpec } from "~/logic/testhelpers";
import { fixTypes } from "~/reducers/helpers";
import { getAllAccounts, requireSigner } from "~/selectors";
import { makeStore } from "~/store";
import { getTransactions } from "~/store/notifications/selectors";
import { sleep } from "~/utils/timer";

import { bootSequence } from "./boot";
import { drinkFaucetSequence } from "./faucet";

describe("drinkFaucetSequence", () => {
  mayTestFull(
    "gives a new account some tokens",
    async () => {
      const store = makeStore();
      const password = randomString(16);

      // we must boot before any other actions
      const testSpecData = await testSpec();
      const testChainsData = await testChains();
      const faucets = await faucetSpecs();
      const totalFaucetChains = faucets ? faucets.length : 0;
      const bootAction = bootSequence(password, testSpecData, testChainsData);
      // TODO we should get rid of this `as any` for dispatch
      await fixTypes(store.dispatch(bootAction as any));
      // after a dispatch resolves, we may have to wait a bit for the redux state to update.....
      await sleep(20);

      try {
        // validate the current accounts are undefined
        const thirstyAccounts = getAllAccounts(store.getState());
        expect(thirstyAccounts.length).toEqual(totalFaucetChains);
        const chains = thirstyAccounts.map(ac => ac.chainId); // we will check later

        expect(getTransactions(store.getState()).length).toEqual(totalFaucetChains);

        // get the addresses for later...
        const addresses = getAllAccounts(store.getState()).map(acct => acct.address);
        expect(addresses.length).toEqual(totalFaucetChains);

        // drink from all faucets
        const faucetAction = drinkFaucetSequence(faucets, getAllAccounts(store.getState()));
        // TODO we should get rid of this `as any` for dispatch
        await fixTypes(store.dispatch(faucetAction as any));

        // it seems the faucet dispatch takes a while to resolve....
        // TODO: investigate
        await sleep(15000);

        // validate the current account is defined and has some tokens
        const fullAccounts = getAllAccounts(store.getState());
        expect(fullAccounts.length).toEqual(totalFaucetChains);
        fullAccounts.forEach(ac => {
          expect(chains.includes(ac.chainId)).toBeTruthy(); // chainId present
          expect(ac.account).toBeDefined(); // but with tokens

          const account = ac.account!;
          // we should have something here
          expect(account.balance.length).toEqual(1);
          // check that the returned balance is greater than 2
          const minBalance = {
            quantity: "2",
            fractionalDigits: 0,
            tokenTicker: account.balance[0].tokenTicker,
          };
          expect(compareAmounts(account.balance[0], minBalance)).toBeGreaterThanOrEqual(1);
          expect(addresses.includes(ac.address)).toBeTruthy(); // address present
        });

        // validate there is now a transaction set in the state tree
        const transactions = getTransactions(store.getState());
        expect(transactions.length).toEqual(6);
      } finally {
        // make sure to close connections so test ends
        const signer = requireSigner(store.getState());
        signer.shutdown();
      }
    },
    20000,
  );
});
