import boot, { BootType } from "~/routes/signupPass/store/actions/boot";

export interface HomeActions {
  readonly boot: BootType;
}

export default {
  boot,
};
