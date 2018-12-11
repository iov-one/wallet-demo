import boot, { BootType } from "~/routes/signup/store/actions/boot";
import drinkFaucet, { DrinkFaucetType } from "~/routes/signup/store/actions/drinkFaucet";
import reset, { ResetType } from "~/routes/signup/store/actions/reset";
import setNameAction, { SetNameType } from "~/routes/signup/store/actions/setName";

export interface HomeActions {
  readonly reset: ResetType;
  readonly boot: BootType;
  readonly drinkFaucet: DrinkFaucetType;
  readonly setName: SetNameType;
}

export default {
  reset,
  boot,
  drinkFaucet,
  setName: setNameAction,
};
