// tslint:disable:no-string-literal
import { BALANCE_ROUTE, SET_NAME_ROUTE } from "~/routes";
import { BootType } from "~/routes/signupPass/store/actions/boot";
import { DrinkFaucetType } from "~/routes/signupPass/store/actions/drinkFaucet";
import { history } from "~/store";
import { BlockchainSpec } from "../logic/connection";
import { allFaucetSpecs, loadConfig } from "../utils/conf";

export const loginAccount = async (
  boot: BootType,
  drinkFaucet: DrinkFaucetType,
  pass: string,
  mnemonic?: string,
) => {
  const config = await loadConfig();
  const chains = config.chains.map(cfg => cfg.chainSpec as BlockchainSpec);
  const { accounts } = await boot(pass, config.bns.chainSpec as BlockchainSpec, chains, mnemonic);
  const mainAccount = accounts[0];
  const account = mainAccount ? mainAccount.account : undefined;
  if (!account) {
    const faucets = allFaucetSpecs(config);
    await drinkFaucet(faucets);
    history.push(SET_NAME_ROUTE);

    return;
  }

  const hasName = mainAccount && mainAccount.username !== undefined;
  if (hasName) {
    history.push(BALANCE_ROUTE);

    return;
  }

  history.push(SET_NAME_ROUTE);
};
