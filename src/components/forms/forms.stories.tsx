import { Button, MenuItem } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import { FormState } from "final-form";
import * as React from "react";
import { sleep } from "~/utils/timer";
import Checkbox from "./Checkbox";
import Field from "./Field";
import Form, { Errors } from "./Form";
import SelectField from "./SelectField";
import TextField from "./TextField";
import { composeValidators, greaterThan, mustBeInteger, required } from "./validator";

const onSubmit = async (values: object) => {
  await sleep(300);
  window.alert(JSON.stringify(values));
};

const verifyFruit = async (fruit: string) => {
  await sleep(400); // simulate an async validation
  if (fruit === "1") {
    return { fruits: "Banana is already selected" };
  }

  return {};
};

const buttonStyle: React.CSSProperties = {
  margin: "16px",
};

// TODO improve validation TS definition, introducing generics on Form component
const validate = (values: any) => {
  let errors: Errors = {};
  if (!values.terms) {
    errors = { ...errors, terms: "You have to agree with terms" };
  }

  return Object.keys(errors).length ? errors : verifyFruit(values.fruits);
};

storiesOf("Components /forms", module).add("Add react-final-form form", () => (
  <div style={{ width: "250px" }}>
    <Form onSubmit={onSubmit} validation={validate}>
      {({ submitting, errors }: FormState) => (
        <React.Fragment>
          <Field
            name="age"
            type="text"
            validate={composeValidators(required, mustBeInteger, greaterThan(18))}
            component={TextField}
            placeholder="Your age"
          />
          {errors && errors.terms && <div style={{ color: "red" }}>{errors.terms}</div>}
          <Field name="terms" type="checkbox" component={Checkbox} />
          <Field name="fruits" component={SelectField} label="Favourite fruits" validate={required}>
            <MenuItem value="1">Banana</MenuItem>
            <MenuItem value="2">Kiwi</MenuItem>
          </Field>
          <Button style={buttonStyle} color="primary" type="submit" variant="contained" disabled={submitting}>
            Continue
          </Button>
        </React.Fragment>
      )}
    </Form>
  </div>
));
