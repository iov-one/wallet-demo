// tslint:disable:no-unused-expression
import { expect } from "chai";
import "mocha";

// import { faucetProfile, randomString, testSpec } from "../logic/testhelpers";
import { randomString, skipTests, testSpec } from "../logic/testhelpers";
import { fixTypes } from "../reducers/helpers";
import { makeStore } from "../store";
// import { bootSequence, setNameSequence } from "./index";
import { bootSequence } from "./index";

describe("boot sequence", () => {
  it("initializes the chain", async function(): Promise<void> {
    if (skipTests()) {
      this.skip();
      return;
    }
    const store = makeStore();
    const password = randomString(16);

    const action = bootSequence(password, [testSpec]);
    const res = fixTypes(store.dispatch(action));
    const signer = await res.payload;

    const state = store.getState();
    expect(state.profile.activeIdentity).not.to.be.undefined;
    expect(state.blockchain.internal.signer).not.to.be.undefined;
    expect(Object.keys(state.blockchain.internal.connections).length).to.equal(1);

    // this should fail
    expect(signer).to.equal({});
  });
});
