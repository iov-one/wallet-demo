// tslint:disable:no-string-literal
import { RootState } from "~/reducers";
import { fixTypes } from "~/reducers/helpers";
import { BALANCE_ROUTE, SET_NAME_ROUTE } from "~/routes";
import { BootType } from "~/routes/signupPass/store/actions/boot";
import { DrinkFaucetType } from "~/routes/signupPass/store/actions/drinkFaucet";
import { history } from "~/store";
import { BlockchainSpec } from "../logic/connection";
import { allFaucetSpecs, loadConfig } from "../utils/conf";

import { BootResult, bootSequence } from "./boot";
import { drinkFaucetSequence } from "./faucet";
import { RootThunkDispatch } from "./types";

export const loginAccount = async (
  boot: BootType,
  drinkFaucet: DrinkFaucetType,
  pass: string,
  mnemonic?: string,
) => {
  const config = await loadConfig();
  const chains = config.chains.map(cfg => cfg.chainSpec as BlockchainSpec);
  const { accounts } = await boot(pass, config.bns.chainSpec as BlockchainSpec, chains, mnemonic);

  // TODO: we should check each chain for which accounts are defined
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

// this will boot and drink faucets, using the config
export const loginSequence = (password: string, mnemonic?: string) => async (
  dispatch: RootThunkDispatch,
  _: () => RootState,
): Promise<BootResult> => {
  const config = await loadConfig();
  const chains = config.chains.map(cfg => cfg.chainSpec as BlockchainSpec);
  const bns = config.bns.chainSpec as BlockchainSpec;
  const action = bootSequence(password, bns, chains, mnemonic);

  // TODO we should get rid of this `as any` for dispatch
  const res = await fixTypes(dispatch(action as any));
  // and this ugly cast on return value
  const result = (res as any) as BootResult;
  const { accounts } = result;

  // TODO: we should check each chain for which accounts are defined
  const mainAccount = accounts[0];
  const account = mainAccount ? mainAccount.account : undefined;
  if (!account) {
    const faucets = allFaucetSpecs(config);
    const drinkFaucet = drinkFaucetSequence(faucets);
    await fixTypes(dispatch(drinkFaucet as any));
  }
  return result;
};
