import { takeFaucetCredit } from "~/logic";
import { RootState } from "~/reducers";
import { getAllAccounts } from "~/selectors";
import { FaucetSpec } from "~/utils/conf";

import { RootThunkDispatch } from "./types";

export const drinkFaucetSequence = (faucets: ReadonlyArray<FaucetSpec | undefined>) => async (
  _: RootThunkDispatch,
  getState: () => RootState,
) => {
  const accounts = getAllAccounts(getState());
  // drink from every defined faucet
  const resolved = faucets.map((f, i) => {
    // no facuet or already existing account means no need to drink
    if (f === undefined || accounts[i].account !== undefined) {
      return undefined;
    }
    return takeFaucetCredit(f!.uri, accounts[i].address, f!.token);
  });
  await Promise.all(resolved);
};
