import boot, { BootType } from "~/routes/signupPass/store/actions/boot";

export interface ActionsInterface {
  readonly boot: BootType;
}

export default {
  boot,
};
