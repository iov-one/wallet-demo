import { compareAmounts } from "~/logic";
import { faucetSpecs, mayTestBns, randomString, testChains, testSpec } from "~/logic/testhelpers";
import { fixTypes } from "~/reducers/helpers";
import { getActiveChainAddresses, getMyAccounts, requireSigner } from "~/selectors";
import { makeStore } from "~/store";
import { getTransactions } from "~/store/notifications/selectors";
import { sleep } from "~/utils/timer";

import { bootSequence } from "./boot";
import { drinkFaucetSequence } from "./faucet";

describe("drinkFaucetSequence", () => {
  mayTestBns(
    "gives a new account some tokens",
    async () => {
      const store = makeStore();
      const password = randomString(16);
      const totalFaucetChains = 3;

      // we must boot before any other actions
      const testSpecData = await testSpec();
      const testChainsData = await testChains();
      const bootAction = bootSequence(password, testSpecData, testChainsData);
      // TODO we should get rid of this `as any` for dispatch
      await fixTypes(store.dispatch(bootAction as any));
      // after a dispatch resolves, we may have to wait a bit for the redux state to update.....
      await sleep(20);

      try {
        // validate the current accounts are undefined
        const thirstyAccounts = getMyAccounts(store.getState());
        expect(thirstyAccounts.length).toEqual(totalFaucetChains);
        thirstyAccounts.map(ac => expect(ac.account).toBeUndefined());
        const chains = thirstyAccounts.map(ac => ac.chainId); // we will check later

        // no transactions yet
        expect(getTransactions(store.getState()).length).toEqual(0);

        // get the addresses for later...
        const addresses = getActiveChainAddresses(store.getState());
        expect(addresses.length).toEqual(totalFaucetChains);
        const addr = addresses[0].address;

        // drink from all faucets
        const faucets = await faucetSpecs();
        const faucetAction = drinkFaucetSequence(faucets);
        // TODO we should get rid of this `as any` for dispatch
        await fixTypes(store.dispatch(faucetAction as any));

        // it seems the faucet dispatch takes a while to resolve....
        // TODO: investigate
        await sleep(1000);

        // validate the current account is defined and has some tokens
        const fullAccounts = getMyAccounts(store.getState());
        expect(fullAccounts.length).toEqual(totalFaucetChains);
        fullAccounts.forEach((ac, index) => {
          expect(ac.chainId).toEqual(chains[index]); // same chain
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
          // at the address we expect
          expect(account.address).toEqual(addr);
        });

        // validate there is now a transaction set in the state tree
        const transactions = getTransactions(store.getState());
        expect(transactions.length).toEqual(totalFaucetChains);
        // and we should be the recipient (from the faucet)
        expect(transactions[0].recipient).toEqual(addr);
        expect(transactions[1].recipient).toEqual(addr);
      } finally {
        // make sure to close connections so test ends
        const signer = requireSigner(store.getState());
        for (const chainId of signer.chainIds()) {
          signer.connection(chainId).disconnect();
        }
      }
    },
    10000,
  );
});
