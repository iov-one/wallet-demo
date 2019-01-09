import boot, { BootType } from "~/routes/signupPass/store/actions/boot";
import drinkFaucet, { DrinkFaucetType } from "~/routes/signupPass/store/actions/drinkFaucet";

export interface ActionsInterface {
  readonly boot: BootType;
  readonly drinkFaucet: DrinkFaucetType;
}

export default {
  boot,
  drinkFaucet,
};