import { Address, ChainId, TokenTicker } from "@iov/bcp";

import { AccountInfo, BlockchainState } from "~/reducers/blockchain";
import { ChainToken } from "~/selectors";
import { aNewStore } from "~/store";

import { availableTokensSelector } from "./selector";

function callSelector(store: any): any {
  const accountInfo = store.getState().blockchain.accountInfo;
  const tickers = store.getState().blockchain.tickers;
  return availableTokensSelector.resultFunc(accountInfo, tickers);
}

describe("selector", () => {
  describe("availableTokensSelector", () => {
    const mockBlockchainState: BlockchainState = {
      internal: undefined as any,
      chains: [],
      accountInfo: [
        {
          chainId: "chain-1" as ChainId,
          address: "address-1" as Address,
          account: {
            address: "address-1" as Address,
            balance: [],
          },
          username: "test1",
        },
      ],
      tickers: [
        {
          chainId: "chain-1" as ChainId,
          token: {
            tokenTicker: "T1A" as TokenTicker,
            tokenName: "T1A name",
            fractionalDigits: 0,
          },
        },
        {
          chainId: "chain-NA" as ChainId,
          token: {
            tokenTicker: "NA" as TokenTicker,
            tokenName: "NA name",
            fractionalDigits: 0,
          },
        },
      ],
    };

    const mockRootStoreBase = { blockchain: mockBlockchainState };

    it("should return 1 chain : 1 ticker : 1 address relation", () => {
      const mockRootStore: typeof mockRootStoreBase = JSON.parse(JSON.stringify(mockRootStoreBase));
      const store = aNewStore(mockRootStore);
      const selected = callSelector(store);
      expect(selected).toEqual([{ name: "T1A", address: "address-1", additionalText: "T1A name" }]);
    });

    it("should return 1 chain : 2 tickers : 1 address relation", () => {
      const mockRootStore: typeof mockRootStoreBase = JSON.parse(JSON.stringify(mockRootStoreBase));
      // tslint:disable-next-line: readonly-array
      (mockRootStore.blockchain.tickers as ChainToken[]).push({
        chainId: "chain-1" as ChainId,
        token: {
          tokenTicker: "T2A" as TokenTicker,
          tokenName: "T2A name",
          fractionalDigits: 0,
        },
      });
      const store = aNewStore(mockRootStore);
      const selected = callSelector(store);
      expect(selected).toEqual([
        { name: "T1A", address: "address-1", additionalText: "T1A name" },
        { name: "T2A", address: "address-1", additionalText: "T2A name" },
      ]);
    });

    it("should return 2 chains : 2 tickers : 2 addresses relation", () => {
      const mockRootStore: typeof mockRootStoreBase = JSON.parse(JSON.stringify(mockRootStoreBase));
      // tslint:disable-next-line: readonly-array
      (mockRootStore.blockchain.tickers as ChainToken[]).push({
        chainId: "chain-2" as ChainId,
        token: {
          tokenTicker: "T2A" as TokenTicker,
          tokenName: "T2A name",
          fractionalDigits: 0,
        },
      });
      // tslint:disable-next-line: readonly-array
      (mockRootStore.blockchain.accountInfo as AccountInfo[]).push({
        chainId: "chain-2" as ChainId,
        address: "address-2" as Address,
        account: {
          address: "address-2" as Address,
          balance: [],
        },
        username: "test1",
      });
      const store = aNewStore(mockRootStore);
      const selected = callSelector(store);
      expect(selected).toEqual([
        { name: "T1A", address: "address-1", additionalText: "T1A name" },
        { name: "T2A", address: "address-2", additionalText: "T2A name" },
      ]);
    });

    it("should return 2 chains : 4 tickers : 2 addresses relation", () => {
      const mockRootStore: typeof mockRootStoreBase = JSON.parse(JSON.stringify(mockRootStoreBase));
      // tslint:disable-next-line: readonly-array
      (mockRootStore.blockchain.tickers as ChainToken[]).push(
        {
          chainId: "chain-1" as ChainId,
          token: {
            tokenTicker: "T1B" as TokenTicker,
            tokenName: "T1B name",
            fractionalDigits: 0,
          },
        },
        {
          chainId: "chain-2" as ChainId,
          token: {
            tokenTicker: "T2A" as TokenTicker,
            tokenName: "T2A name",
            fractionalDigits: 0,
          },
        },
        {
          chainId: "chain-2" as ChainId,
          token: {
            tokenTicker: "T2B" as TokenTicker,
            tokenName: "T2B name",
            fractionalDigits: 0,
          },
        },
      );
      // tslint:disable-next-line: readonly-array
      (mockRootStore.blockchain.accountInfo as AccountInfo[]).push({
        chainId: "chain-2" as ChainId,
        address: "address-2" as Address,
        account: {
          address: "address-2" as Address,
          balance: [],
        },
        username: "test1",
      });
      const store = aNewStore(mockRootStore);
      const selected = callSelector(store);
      expect(selected).toEqual([
        { name: "T1A", address: "address-1", additionalText: "T1A name" },
        { name: "T1B", address: "address-1", additionalText: "T1B name" },
        { name: "T2A", address: "address-2", additionalText: "T2A name" },
        { name: "T2B", address: "address-2", additionalText: "T2B name" },
      ]);
    });
  });
});
