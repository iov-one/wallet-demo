import setNameAction, { SetNameType } from "~/routes/signupName/store/actions/setName";

export interface SignupNameActions {
  readonly setName: SetNameType;
}

export default {
  setName: setNameAction,
};
