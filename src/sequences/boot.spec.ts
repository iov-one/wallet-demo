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
      expect(signer.chainIds().length).toEqual(2);
      const [chain1, chain2] = signer.chainIds();
      expect(accounts.length).toEqual(2);
      // empty accounts with same chain
      expect(accounts[0].chainId).toEqual(chain1);
      expect(accounts[0].account).toBeUndefined();
      expect(accounts[1].chainId).toEqual(chain2);
      expect(accounts[1].account).toBeUndefined();
      // same address for now as we have same codec....
      expect(accounts[0].address.length).toBeGreaterThan(10);
      expect(accounts[0].address).toEqual(accounts[1].address);

      // validate state properly initialized
      const state = store.getState();
      expect(state.profile.activeIdentity).toBeDefined();
      expect(state.blockchain.internal.signer).toBeDefined();
      expect(Object.keys(state.blockchain.internal.connections).length).toEqual(2);

      // two tokens registered on each of the chains we connected to
      expect(state.blockchain.tickers.length).toEqual(4);
      const tickers1 = state.blockchain.tickers
        .filter(t => t.chainId === chain1)
        .map(t => t.ticker.tokenTicker);
      expect(tickers1).toEqual(["CASH", "IOV"]);
      const tickers2 = state.blockchain.tickers
        .filter(t => t.chainId === chain2)
        .map(t => t.ticker.tokenTicker);
      expect(tickers2).toEqual(["ASH", "BOV"]);

      // make sure the bns chain is listed
      const bnsId = state.blockchain.bnsId;
      expect(bnsId).toBeDefined();
      expect(bnsId).toEqual(chain1);

      // make sure to close connections so test ends
      for (const chainId of signer.chainIds()) {
        signer.connection(chainId).disconnect();
      }
    },
    4000,
  );
});
