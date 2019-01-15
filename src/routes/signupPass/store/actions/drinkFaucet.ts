import { drinkFaucetSequence } from "~/sequences";
import { FaucetSpec } from "~/utils/conf";

export type DrinkFaucetType = (faucets: ReadonlyArray<FaucetSpec | undefined>) => Promise<void>;

export default (faucets: ReadonlyArray<FaucetSpec | undefined>) => (dispatch: any) =>
  dispatch(drinkFaucetSequence(faucets));
