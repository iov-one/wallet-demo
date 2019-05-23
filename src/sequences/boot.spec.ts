import { Store } from "redux";
import { mayTestFull, randomString, testChains, testSpec } from "~/logic/testhelpers";
import { RootState } from "~/reducers";
import { fixTypes } from "~/reducers/helpers";
import { getOrderedChainIds } from "~/selectors";
import { aNewStore } from "~/store";
import { sleep } from "~/utils/timer";
import { BootResult, bootSequence, shutdownSequence } from "./boot";

describe("boot sequence", () => {
  let store: Store<RootState>;
  beforeEach(() => {
    store = aNewStore();
  });

  afterEach(() => {
    shutdownSequence(null, store.getState);
  });
  mayTestFull(
    "initializes the chain",
    async () => {
      const password = randomString(16);

      const testSpecData = await testSpec();
      const testChainsData = await testChains();
      const totalChains = testChainsData.length + 1;
      const action = bootSequence(password, testSpecData, testChainsData);
      expect(action).toBeDefined();
      expect(action).toBeInstanceOf(Function);

      // TODO we should get rid of this `as any` for dispatch
      const res = await fixTypes(store.dispatch(action as any));
      await sleep(4000);
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
      const state: RootState = store.getState();
      expect(state.blockchain.internal.signer).toBeDefined();
      expect(Object.keys(state.blockchain.internal.connections).length).toEqual(totalChains);

      // CASH, IOV, LSK, ETH
      expect(state.blockchain.tokens.length).toEqual(4);
      const [chain1, chain2, chain3] = chainsLoaded;
      const tickers1 = state.blockchain.tokens
        .filter(t => t.chainId === chain1)
        .map(t => t.token.tokenTicker);
      expect(tickers1).toEqual(["CASH", "IOV"]);
      const tickers2 = state.blockchain.tokens
        .filter(t => t.chainId === chain2)
        .map(t => t.token.tokenTicker);
      expect(tickers2).toEqual(["LSK"]);
      const tickers3 = state.blockchain.tokens
        .filter(t => t.chainId === chain3)
        .map(t => t.token.tokenTicker);
      expect(tickers3).toEqual(["ETH"]);

      // make sure the bns chain is listed
      const bnsId = state.blockchain.bnsId;
      expect(bnsId).toBeDefined();
      expect(bnsId).toEqual(chain1);

      // ensure all chains are registered
      const chainIds = getOrderedChainIds(state);
      expect(chainIds.length).toEqual(3);
      // bns chain
      expect(chainIds[0]).toMatch(/^test-chain/);
      // lisk chain
      expect(chainIds[1]).toMatch(/^[0-9a-f]+$/);
      // ethereum chain
      expect(chainIds[2]).toMatch(/^ethereum-/);

      // make sure to close connections so test ends
      signer.shutdown();
    },
    35000,
  );
});
