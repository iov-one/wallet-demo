import { FieldValidator } from "final-form";

export const greaterThan = (min: number) => (value: string) => {
  if (Number.isNaN(Number(value)) || Number.parseFloat(value) > Number(min)) {
    return undefined;
  }

  return `Should be greater than ${min}`;
};

export const mustBeInteger = (value: string) => {
  if (!Number.isInteger(Number(value)) || value.includes(".")) {
    return "Must be an integer";
  }

  return undefined;
};

export const required = (value: string) => (value ? undefined : "Required");

type Result = string | undefined;
type Validator = (value: string) => Result;

// tslint:disable-next-line:readonly-array
export const composeValidators = (...validators: Validator[]): FieldValidator => (value: string) =>
  validators.reduce(
    (error: string | undefined, validator: Validator) => error || validator(value),
    undefined,
  );
