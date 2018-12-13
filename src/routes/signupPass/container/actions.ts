import boot, { BootType } from "~/routes/signup/store/actions/boot";
import drinkFaucet, { DrinkFaucetType } from "~/routes/signup/store/actions/drinkFaucet";
import setNameAction, { SetNameType } from "~/routes/signup/store/actions/setName";

export interface HomeActions {
  readonly boot: BootType;
  readonly drinkFaucet: DrinkFaucetType;
  readonly setName: SetNameType;
}

export default {
  boot,
  drinkFaucet,
  setName: setNameAction,
};
