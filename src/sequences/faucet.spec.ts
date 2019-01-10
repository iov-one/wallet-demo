import { compareAmounts } from "~/logic";
import { faucetSpec, mayTest, randomString, testChains, testSpec } from "~/logic/testhelpers";
import { fixTypes } from "~/reducers/helpers";
import { getActiveChainAddresses, getMyAccounts, requireSigner } from "~/selectors";
import { makeStore } from "~/store";
import { getTransactions } from "~/store/notifications/selectors";
import { elipsify } from "~/utils/strings";
import { sleep } from "~/utils/timer";

import { bootSequence } from "./boot";
import { drinkFaucetSequence } from "./faucet";

describe("drinkFaucetSequence", () => {
  mayTest(
    "gives a new account some tokens",
    async () => {
      const store = makeStore();
      const password = randomString(16);

      // we must boot before any other actions
      const testSpecData = await testSpec();
      const testChainsData = await testChains();
      const bootAction = bootSequence(password, testSpecData, testChainsData);
      // TODO we should get rid of this `as any` for dispatch
      await fixTypes(store.dispatch(bootAction as any));
      // after a dispatch resolves, we may have to wait a bit for the redux state to update.....
      await sleep(20);

      try {
        // validate the current account is undefined
        const thirstyAccounts = getMyAccounts(store.getState());
        expect(thirstyAccounts.length).toEqual(1);
        expect(thirstyAccounts[0].account).toBeUndefined();
        const firstChain = thirstyAccounts[0].chainId; // we will check later

        // no transactions yet
        expect(getTransactions(store.getState()).length).toEqual(0);

        // get the addresses for later...
        const addresses = getActiveChainAddresses(store.getState());
        expect(addresses.length).toEqual(1);
        const addr = addresses[0].address;

        // now, drink from the faucet....

        const { token: testTicker, uri: faucetUri } = await faucetSpec();
        const faucetAction = drinkFaucetSequence(faucetUri, testTicker);
        // TODO we should get rid of this `as any` for dispatch
        await fixTypes(store.dispatch(faucetAction as any));
        // it seems the faucet dispatch takes a while to resolve....
        // TODO: investigate
        await sleep(1000);

        // validate the current account is defined and has some tokens
        const fullAccounts = getMyAccounts(store.getState());
        expect(fullAccounts.length).toEqual(1);
        expect(fullAccounts[0].chainId).toEqual(firstChain); // same chain
        expect(fullAccounts[0].account).toBeDefined(); // but with tokens
        const account = fullAccounts[0].account!;
        // we should have something here
        expect(account.balance.length).toEqual(1);
        // check that the returned balance is greater than 2
        const minBalance = { quantity: "2", fractionalDigits: 0, tokenTicker: testTicker };
        expect(compareAmounts(account.balance[0], minBalance)).toBeGreaterThanOrEqual(1);
        // at the address we expect
        expect(account.address).toEqual(addr);

        // validate there is now a transaction set in the state tree
        const transactions = getTransactions(store.getState());
        expect(transactions.length).toEqual(1);
        // and we should be the recipient (from the faucet)
        expect(transactions[0].recipient).toEqual(elipsify(addr, 16));
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
