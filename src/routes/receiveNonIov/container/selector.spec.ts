import { availableTokensSelector } from "./selector";

import { aNewStore } from "~/store";

function callSelector(store: any): any {
  const accountInfo = store.getState().blockchain.accountInfo;
  const tickers = store.getState().blockchain.tickers;
  return availableTokensSelector.resultFunc(accountInfo, tickers);
}

describe("selector", () => {
  describe("availableTokensSelector", () => {
    const mockRootStoreBase = {
      blockchain: {
        accountInfo: [
          {
            chainId: "chain-1",
            address: "address-1",
            account: {
              address: "address-1",
            },
            username: "test1",
          },
        ],
        tickers: [
          {
            chainId: "chain-1",
            ticker: {
              tokenTicker: "T1A",
              tokenName: "T1A name",
            },
          },
          {
            chainId: "chain-NA",
            ticker: {
              tokenTicker: "NA",
              tokenName: "NA name",
            },
          },
        ],
      },
    };

    it("should return 1 chain : 1 ticker : 1 address relation", () => {
      const mockRootStore = JSON.parse(JSON.stringify(mockRootStoreBase));
      const store = aNewStore(mockRootStore);
      const selected = callSelector(store);
      expect(selected).toEqual([{ label: "T1A", value: "address-1", description: "T1A name" }]);
    });

    it("should return 1 chain : 2 tickers : 1 address relation", () => {
      const mockRootStore = JSON.parse(JSON.stringify(mockRootStoreBase));
      mockRootStore.blockchain.tickers.push({
        chainId: "chain-1",
        ticker: {
          tokenTicker: "T2A",
          tokenName: "T2A name",
        },
      });
      const store = aNewStore(mockRootStore);
      const selected = callSelector(store);
      expect(selected).toEqual([
        { label: "T1A", value: "address-1", description: "T1A name" },
        { label: "T2A", value: "address-1", description: "T2A name" },
      ]);
    });

    it("should return 2 chains : 2 tickers : 2 addresses relation", () => {
      const mockRootStore = JSON.parse(JSON.stringify(mockRootStoreBase));
      mockRootStore.blockchain.tickers.push({
        chainId: "chain-2",
        ticker: {
          tokenTicker: "T2A",
          tokenName: "T2A name",
        },
      });
      mockRootStore.blockchain.accountInfo.push({
        chainId: "chain-2",
        address: "address-2",
        account: {
          address: "address-2",
        },
        username: "test1",
      });
      const store = aNewStore(mockRootStore);
      const selected = callSelector(store);
      expect(selected).toEqual([
        { label: "T1A", value: "address-1", description: "T1A name" },
        { label: "T2A", value: "address-2", description: "T2A name" },
      ]);
    });

    it("should return 2 chains : 4 tickers : 2 addresses relation", () => {
      const mockRootStore = JSON.parse(JSON.stringify(mockRootStoreBase));
      mockRootStore.blockchain.tickers.push(
        {
          chainId: "chain-1",
          ticker: {
            tokenTicker: "T1B",
            tokenName: "T1B name",
          },
        },
        {
          chainId: "chain-2",
          ticker: {
            tokenTicker: "T2A",
            tokenName: "T2A name",
          },
        },
        {
          chainId: "chain-2",
          ticker: {
            tokenTicker: "T2B",
            tokenName: "T2B name",
          },
        },
      );
      mockRootStore.blockchain.accountInfo.push({
        chainId: "chain-2",
        address: "address-2",
        account: {
          address: "address-2",
        },
        username: "test1",
      });
      const store = aNewStore(mockRootStore);
      const selected = callSelector(store);
      expect(selected).toEqual([
        { label: "T1A", value: "address-1", description: "T1A name" },
        { label: "T1B", value: "address-1", description: "T1B name" },
        { label: "T2A", value: "address-2", description: "T2A name" },
        { label: "T2B", value: "address-2", description: "T2B name" },
      ]);
    });
  });
});
