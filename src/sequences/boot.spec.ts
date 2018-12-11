import { mayTest, randomString, testSpec } from "../logic/testhelpers";
import { fixTypes } from "../reducers/helpers";
import { makeStore } from "../store";
import { BootResult, bootSequence } from "./boot";

describe("boot sequence", () => {
  mayTest(
    "initializes the chain",
    async () => {
      const store = makeStore();
      const password = randomString(16);

      const action = bootSequence(password, [testSpec]);
      expect(action).toBeDefined();
      expect(action).toBeInstanceOf(Function);

      // TODO we should get rid of this `as any` for dispatch
      const res = await fixTypes(store.dispatch(action as any));
      // and this ugly cast on return value
      const { signer, accounts } = (res as any) as BootResult;
      expect(signer.chainIds().length).toEqual(1);
      expect(accounts.length).toEqual(1);
      expect(accounts[0]).toBeUndefined();

      // validate state properly initialized
      const state = store.getState();
      expect(state.profile.activeIdentity).toBeDefined();
      expect(state.blockchain.internal.signer).toBeDefined();
      expect(Object.keys(state.blockchain.internal.connections).length).toEqual(1);

      // make sure to close connections so test ends
      for (const chainId of signer.chainIds()) {
        signer.connection(chainId).disconnect();
      }
    },
    4000,
  );
});