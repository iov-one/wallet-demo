// tslint:disable:no-string-literal
import config from "config";
import { BALANCE_ROUTE, SET_NAME_ROUTE } from "~/routes";
import { BootType } from "~/routes/signupPass/store/actions/boot";
import { DrinkFaucetType } from "~/routes/signupPass/store/actions/drinkFaucet";
import { history } from "~/store";

export const loginAccount = async (boot: BootType, drinkFaucet: DrinkFaucetType, pass: string) => {
  const { accounts } = await boot(pass, [config["chainSpec"]]);
  const mainAccount = accounts[0];
  const account = mainAccount ? mainAccount.account : undefined;
  if (!account) {
    await drinkFaucet(config["defaultFaucetUri"], config["faucetToken"]);
    history.push(SET_NAME_ROUTE);

    return;
  }

  const hasName = account.name !== undefined;
  if (hasName) {
    history.push(BALANCE_ROUTE);

    return;
  }

  history.push(SET_NAME_ROUTE);
};
