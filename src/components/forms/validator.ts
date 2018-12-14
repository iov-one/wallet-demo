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

export const fieldRegex = (regex: RegExp, error: string) => (value: string) => {
  if (!regex.test(value)) {
    return error;
  }

  return undefined;
};

export const lengthGreaterThan = (minCharacters: number) => (value: string) => {
  if (value.length < minCharacters) {
    return `Must be at least ${minCharacters} characters`;
  }

  return undefined;
};

export const lengthLowerThan = (maxCharacters: number) => (value: string) => {
  if (value.length > maxCharacters) {
    return `Can not be longer than ${maxCharacters} characters`;
  }

  return undefined;
};

export const required = (value: string) => (value ? undefined : "Required");

export const validEmail = (email: string) => {
  // obtained from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regexp.test(String(email).toLowerCase()) ? undefined : "Introduce a valid email";
};

type Result = string | undefined;
type Validator = (value: string) => Result;

// tslint:disable-next-line:readonly-array
export const composeValidators = (...validators: Validator[]): FieldValidator => (value: string) =>
  validators.reduce(
    (error: string | undefined, validator: Validator) => error || validator(value),
    undefined,
  );
