// tslint:disable:no-string-literal
import { BALANCE_ROUTE, SET_NAME_ROUTE } from "~/routes";
import { BootType } from "~/routes/signupPass/store/actions/boot";
import { DrinkFaucetType } from "~/routes/signupPass/store/actions/drinkFaucet";
import { history } from "~/store";
import { BlockchainSpec } from "../logic/connection";
import { loadConfig } from "../utils/conf";

export const loginAccount = async (
  boot: BootType,
  drinkFaucet: DrinkFaucetType,
  pass: string,
  mnemonic?: string,
) => {
  const config = await loadConfig();
  const { accounts } = await boot(pass, [config.bns.chainSpec as BlockchainSpec], mnemonic);
  const mainAccount = accounts[0];
  const account = mainAccount ? mainAccount.account : undefined;
  if (!account) {
    await drinkFaucet(config.bns.faucetSpec!.uri, config.bns.faucetSpec!.token);
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
