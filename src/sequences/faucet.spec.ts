import { faucetUri, mayTest, randomString, testSpec, testTicker } from "../logic/testhelpers";
import { fixTypes } from "../reducers/helpers";
import { getMyAccounts, requireSigner } from "../selectors";
import { makeStore } from "../store";

import { bootSequence } from "./boot";
import { drinkFaucetSequence } from "./faucet";

describe("drinkFaucetSequence", () => {
  mayTest(
    "gives a new account some tokens",
    async () => {
      const store = makeStore();
      const password = randomString(16);

      // we must boot before any other actions
      const bootAction = bootSequence(password, [testSpec]);
      // TODO we should get rid of this `as any` for dispatch
      await fixTypes(store.dispatch(bootAction as any));

      try {
        // validate the current account is undefined
        const thirstyAccounts = getMyAccounts(store.getState());
        expect(thirstyAccounts.length).toEqual(1);
        expect(thirstyAccounts[0].account).toBeUndefined();
        const firstChain = thirstyAccounts[0].chainId; // we will check later

        // now, drink from the faucet....
        const faucetAction = drinkFaucetSequence(faucetUri, testTicker);
        // TODO we should get rid of this `as any` for dispatch
        await fixTypes(store.dispatch(faucetAction as any));

        // validate the current account is defined and has some tokens
        const fullAccounts = getMyAccounts(store.getState());
        expect(fullAccounts.length).toEqual(1);
        expect(fullAccounts[0].chainId).toEqual(firstChain); // same chain
        expect(fullAccounts[0].account).toBeDefined(); // but with tokens
        const account = fullAccounts[0].account!;
        // we should have something here
        expect(account.balance.length).toEqual(1);
        expect(account.balance[0].tokenTicker).toEqual(testTicker);
        expect(account.balance[0].whole).toBeGreaterThanOrEqual(1);
      } finally {
        // make sure to close connections so test ends
        const signer = requireSigner(store.getState());
        for (const chainId of signer.chainIds()) {
          signer.connection(chainId).disconnect();
        }
      }
    },
    8000,
  );
});
