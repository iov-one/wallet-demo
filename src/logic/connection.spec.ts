import { MultiChainSigner } from "@iov/core";

import { addBlockchain } from "./connection";
import { createProfile } from "./profile";
import { mayTestBns, testSpec } from "./testhelpers";

describe("addBlockchain", () => {
  mayTestBns("should connect to local testnet", async () => {
    const profile = await createProfile();
    const writer = new MultiChainSigner(profile);
    const testSpecData = await testSpec();
    const { connection: reader } = await addBlockchain(writer, profile, testSpecData);
    try {
      expect(reader).toBeTruthy();
      // basic checks that we connected properly
      expect(reader.chainId()).toMatch(/chain-/);

      // check a reasonable height
      expect(await reader.height()).toBeGreaterThan(1);

      // check proper tickers
      const tokens = await reader.getAllTokens();
      expect(tokens.length).toEqual(2);
      const tickers = tokens.map(token => token.tokenTicker);
      expect(tickers).toEqual(["CASH", "IOV"]);
    } finally {
      writer.shutdown();
    }
  });
});
