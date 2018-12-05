// tslint:disable:no-unused-expression
import { expect } from "chai";
import "mocha";

// import { faucetProfile, randomString, testSpec } from "../logic/testhelpers";
import { randomString, skipTests, testSpec } from "../logic/testhelpers";
import { fixTypes } from "../reducers/helpers";
import { makeStore } from "../store";
// import { bootSequence, setNameSequence } from "./index";
import { BootResult, bootSequence } from "./index";

describe("boot sequence", () => {
  it("initializes the chain", async function(): Promise<any> {
    if (skipTests()) {
      this.skip();
      return;
    }
    this.timeout(4000);

    const store = makeStore();
    const password = randomString(16);

    const action = bootSequence(password, [testSpec]);
    expect(action).not.to.be.undefined;
    expect(action).to.be.instanceof(Function);

    // TODO we should get rid of this `as any` for dispatch
    const res = await fixTypes(store.dispatch(action as any));
    // and this ugly cast on return value
    const { signer, accounts } = (res as any) as BootResult;
    expect(signer.chainIds().length).to.equal(1);
    expect(accounts.length).to.equal(1);
    expect(accounts[0]).to.be.undefined;

    // validate state properly initialized
    const state = store.getState();
    expect(state.profile.activeIdentity).not.to.be.undefined;
    expect(state.blockchain.internal.signer).not.to.be.undefined;
    expect(Object.keys(state.blockchain.internal.connections).length).to.equal(1);

    // make sure to close connections so test ends
    for (const chainId of signer.chainIds()) {
      signer.connection(chainId).disconnect();
    }
  });
});
