import { BcpTicker } from "@iov/bcp-types";
import { MultiChainSigner } from "@iov/core";

import { addBlockchain } from "./connection";
import { createProfile } from "./profile";
import { bnsChainId, mayTestBns, testSpec } from "./testhelpers";

describe("addBlockchain", () => {
  mayTestBns("should connect to local testnet", async () => {
    const chainIdBns = await bnsChainId();
    const profile = await createProfile(chainIdBns);
    const writer = new MultiChainSigner(profile);
    const testSpecData = await testSpec();
    const { connection: reader } = await addBlockchain(writer, testSpecData);
    try {
      expect(reader).toBeTruthy();
      // basic checks that we connected properly
      expect(reader.chainId()).toMatch(/chain-/);

      // check a reasonable height
      expect(await reader.height()).toBeGreaterThan(1);

      // check proper tickers
      const tickers = await reader.getAllTickers();
      expect(tickers.length).toEqual(2);
      const tokens = tickers.map((tick: BcpTicker) => tick.tokenTicker);
      expect(tokens).toEqual(["CASH", "IOV"]);
    } finally {
      reader.disconnect();
    }
  });
});
