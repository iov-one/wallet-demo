import { TokenTicker } from "@iov/core";
import { drinkFaucetSequence } from "~/sequences";

export type DrinkFaucetType = (faucetUri: string, ticker: TokenTicker) => Promise<void>;

export default (faucetUri: string, ticker: TokenTicker) => (dispatch: any) =>
  dispatch(drinkFaucetSequence(faucetUri, ticker));
