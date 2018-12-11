import { TokenTicker } from "@iov/core";

import { keyToAddress, takeFaucetCredit } from "../logic";
import { RootState } from "../reducers";
import { requireActiveIdentity } from "../selectors";
import { RootThunkDispatch } from "./types";

export const drinkFaucetSequence = (facuetUri: string, ticker: TokenTicker) => async (
  _: RootThunkDispatch,
  getState: () => RootState,
) => {
  const identity = requireActiveIdentity(getState());
  // --take a drink from the faucet
  const address = keyToAddress(identity);
  await takeFaucetCredit(facuetUri, address, ticker);
};
