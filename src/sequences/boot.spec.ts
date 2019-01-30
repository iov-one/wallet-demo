import { mayTestFull, randomString, testChains, testSpec } from "~/logic/testhelpers";
import { fixTypes } from "~/reducers/helpers";
import { makeStore } from "~/store";

import { BootResult, bootSequence } from "./boot";

describe("boot sequence", () => {
  mayTestFull(
    "initializes the chain",
    async () => {
      const store = makeStore();
      const password = randomString(16);

      const testSpecData = await testSpec();
      const testChainsData = await testChains();
      const totalChains = testChainsData.length + 1;
      const action = bootSequence(password, testSpecData, testChainsData);
      expect(action).toBeDefined();
      expect(action).toBeInstanceOf(Function);

      // TODO we should get rid of this `as any` for dispatch
      const res = await fixTypes(store.dispatch(action as any));
      // and this ugly cast on return value
      const { signer, accounts } = (res as any) as BootResult;
      expect(signer.chainIds().length).toEqual(totalChains);
      const chainsLoaded = signer.chainIds();
      expect(accounts.length).toEqual(3);
      // empty accounts with same chain
      accounts.forEach((ac, index) => {
        expect(ac.chainId).toEqual(chainsLoaded[index]);
        expect(ac.account).toBeUndefined();
      });
      // we have different addresses for each chain
      expect(accounts[0].address.length).toBeGreaterThan(10);
      expect(accounts[0].address).not.toEqual(accounts[1].address);

      // validate state properly initialized
      const state = store.getState();
      expect(state.blockchain.internal.signer).toBeDefined();
      expect(Object.keys(state.blockchain.internal.connections).length).toEqual(totalChains);

      // two tokens registered on each of the chains we connected to
      expect(state.blockchain.tickers.length).toEqual(5);
      const [chain1, chain2, chain3] = chainsLoaded;
      const tickers1 = state.blockchain.tickers
        .filter(t => t.chainId === chain1)
        .map(t => t.ticker.tokenTicker);
      expect(tickers1).toEqual(["CASH", "IOV"]);
      const tickers2 = state.blockchain.tickers
        .filter(t => t.chainId === chain2)
        .map(t => t.ticker.tokenTicker);
      expect(tickers2).toEqual(["ASH", "BOV"]);
      const tickers3 = state.blockchain.tickers
        .filter(t => t.chainId === chain3)
        .map(t => t.ticker.tokenTicker);
      expect(tickers3).toEqual(["LSK"]);

      // make sure the bns chain is listed
      const bnsId = state.blockchain.bnsId;
      expect(bnsId).toBeDefined();
      expect(bnsId).toEqual(chain1);

      // make sure to close connections so test ends
      signer.shutdown();
    },
    4000,
  );
});
