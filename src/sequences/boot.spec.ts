import { mayTestBns, randomString, testChains, testSpec } from "~/logic/testhelpers";
import { fixTypes } from "~/reducers/helpers";
import { makeStore } from "~/store";

import { BootResult, bootSequence } from "./boot";

describe("boot sequence", () => {
  mayTestBns(
    "initializes the chain",
    async () => {
      const store = makeStore();
      const password = randomString(16);

      const testSpecData = await testSpec();
      const testChainsData = await testChains();
      const action = bootSequence(password, testSpecData, testChainsData);
      expect(action).toBeDefined();
      expect(action).toBeInstanceOf(Function);

      // TODO we should get rid of this `as any` for dispatch
      const res = await fixTypes(store.dispatch(action as any));
      // and this ugly cast on return value
      const { signer, accounts } = (res as any) as BootResult;
      expect(signer.chainIds().length).toEqual(1);
      expect(accounts.length).toEqual(1);
      expect(accounts[0].account).toBeUndefined();

      // validate state properly initialized
      const state = store.getState();
      expect(state.profile.activeIdentity).toBeDefined();
      expect(state.blockchain.internal.signer).toBeDefined();
      expect(Object.keys(state.blockchain.internal.connections).length).toEqual(1);
      expect(state.blockchain.tickers.length).toEqual(2);
      const tickers = state.blockchain.tickers.map(t => t.ticker.tokenTicker);
      expect(tickers).toEqual(["CASH", "IOV"]);

      // make sure all tickers have a chainId in the list (it may be repeated...)
      const chains = state.blockchain.tickers.map(t => t.chainId);
      chains.map(chainId => expect(signer.chainIds()).toContain(chainId));

      // make sure the bns chain is listed
      const bnsId = state.blockchain.bnsId;
      expect(bnsId).toBeDefined();
      expect(bnsId).toEqual(signer.chainIds()[0]);

      // make sure to close connections so test ends
      for (const chainId of signer.chainIds()) {
        signer.connection(chainId).disconnect();
      }
    },
    4000,
  );
});
