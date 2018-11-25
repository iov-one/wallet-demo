import { FormState } from "final-form";
import * as React from "react";
import { Form } from "react-final-form";
import Checkbox from "~/components/forms/Checkbox";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import Button from "~/components/layout/Button";
import Col from "~/components/layout/Col";

type Props = {};

type State = {
  readonly page: number;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async (values: object) => {
  await sleep(300);
  console.log(values);
};

class SignUp extends React.Component<Props, State> {
  public readonly state = {
    page: 0,
  };

  public render(): JSX.Element {
    return (
      <div>
        <div>Picture goes here</div>
        <div>
          <div>Row -> Already have an account? Log in</div>
          <div>Row -> Form title here</div>
          <div>
            <Form onSubmit={onSubmit}>
              {({ pristine, invalid }: FormState) => (
                <React.Fragment>
                  <div>
                    <label>Email</label>
                    <Field name="email" type="text" component={TextField} placeholder="Your Email" />
                  </div>
                  <Field name="password" type="password" component={TextField} placeholder="Password" />
                  <Field
                    name="confirmPassword"
                    type="password"
                    component={TextField}
                    placeholder="Confirm Password"
                  />
                  <Col margin="sm">
                    <label>I certify that I am 18 years of age or older</label>
                    <Field name="terms" component={Checkbox} type="checkbox" />
                  </Col>
                  <Button type="submit" disabled={pristine || invalid}>
                    Continue
                  </Button>
                </React.Fragment>
              )}
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
