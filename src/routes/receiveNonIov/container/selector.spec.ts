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
            },
          },
          {
            chainId: "chain-NA",
            ticker: {
              tokenTicker: "NA",
            },
          },
        ],
      },
    };

    it("should return 1 chain : 1 ticker : 1 address relation", () => {
      const mockRootStore = JSON.parse(JSON.stringify(mockRootStoreBase));
      const store = aNewStore(mockRootStore);
      const selected = callSelector(store);
      expect(selected).toEqual([{ token: "T1A", address: "address-1" }]);
    });

    it("should return 1 chain : 2 tickers : 1 address relation", () => {
      const mockRootStore = JSON.parse(JSON.stringify(mockRootStoreBase));
      mockRootStore.blockchain.tickers.push({
        chainId: "chain-1",
        ticker: {
          tokenTicker: "T2A",
        },
      });
      const store = aNewStore(mockRootStore);
      const selected = callSelector(store);
      expect(selected).toEqual([
        { token: "T1A", address: "address-1" },
        { token: "T2A", address: "address-1" },
      ]);
    });

    it("should return 2 chains : 2 tickers : 2 addresses relation", () => {
      const mockRootStore = JSON.parse(JSON.stringify(mockRootStoreBase));
      mockRootStore.blockchain.tickers.push({
        chainId: "chain-2",
        ticker: {
          tokenTicker: "T2A",
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
        { token: "T1A", address: "address-1" },
        { token: "T2A", address: "address-2" },
      ]);
    });

    it("should return 2 chains : 4 tickers : 2 addresses relation", () => {
      const mockRootStore = JSON.parse(JSON.stringify(mockRootStoreBase));
      mockRootStore.blockchain.tickers.push({
        chainId: "chain-1",
        ticker: {
          tokenTicker: "T1B",
        },
      },{
        chainId: "chain-2",
        ticker: {
          tokenTicker: "T2A",
        },
      },{
        chainId: "chain-2",
        ticker: {
          tokenTicker: "T2B",
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
        { token: "T1A", address: "address-1" },
        { token: "T1B", address: "address-1" },
        { token: "T2A", address: "address-2" },
        { token: "T2B", address: "address-2" },
      ]);
    });
  });
});
