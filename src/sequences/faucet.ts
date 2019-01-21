import { bnsCodec } from "@iov/bns";
import { liskCodec } from "@iov/lisk";

import { keyToAddress, takeFaucetCredit } from "~/logic";
import { RootState } from "~/reducers";
import { requireActiveIdentity } from "~/selectors";
import { FaucetSpec } from "~/utils/conf";

import { RootThunkDispatch } from "./types";

export const drinkFaucetSequence = (faucets: ReadonlyArray<FaucetSpec | undefined>) => async (
  _: RootThunkDispatch,
  getState: () => RootState,
) => {
  const identity = requireActiveIdentity(getState());

  // drink from every defined faucet
  const resolved = faucets
    .filter(f => f !== undefined)
    .map(f => {
      // TODO: we will need codec info here for proper multichain
      const codec = f!.token === "LSK" ? liskCodec : bnsCodec;
      const address = keyToAddress(identity, codec);
      return takeFaucetCredit(f!.uri, address, f!.token);
    });
  await Promise.all(resolved);
};
