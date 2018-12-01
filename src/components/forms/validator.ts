import { FieldValidator } from "final-form";
type Field = boolean | string | null | typeof undefined;

export const greaterThan = (min: number) => (value: string) => {
  if (Number.isNaN(Number(value)) || Number.parseFloat(value) > Number(min)) {
    return undefined;
  }

  return `Should be greater than ${min}`;
};

export const mustBeInteger = (value: string) =>
  !Number.isInteger(Number(value)) || value.includes(".") ? "Must be an integer" : undefined;

export const required = (value: Field) => (value ? undefined : "Required");

type Validator = (value: Field) => typeof undefined | string;

// tslint:disable-next-line:readonly-array
export const composeValidators = (...validators: Validator[]): FieldValidator => (value: Field) =>
  validators.reduce(
    (error: string | undefined, validator: Validator) => error || validator(value),
    undefined,
  );
