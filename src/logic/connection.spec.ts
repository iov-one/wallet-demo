import { MultiChainSigner } from "@iov/core";

import { addBlockchain } from "./connection";
import { createProfile } from "./profile";
import { skipTests, testSpec } from "./testhelpers";

describe("addBlockchain", () => {
  it("should connect to local testnet", async () => {
    if (skipTests()) {
      // TODO:
      console.log("Skipping test...");
      return;
    }
    const profile = await createProfile();
    const writer = new MultiChainSigner(profile);
    const reader = await addBlockchain(writer, testSpec);
    try {
      expect(reader).toBeTruthy();
      // basic checks that we connected properly
      expect(reader.chainId()).toMatch(/chain-/);
      expect(await reader.height()).toBeGreaterThan(1);
    } finally {
      reader.disconnect();
    }
  });
});
