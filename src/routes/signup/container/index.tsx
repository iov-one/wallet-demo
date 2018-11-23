import * as React from "react";
import { Field, Form, FormRenderProps } from "react-final-form";
import Checkbox from "~/components/forms/Checkbox";
import TextField from "~/components/forms/TextField";
import IovButton from "~/components/layout/Button";

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
            <Form
              onSubmit={onSubmit}
              // validate={validate}
              render={({ handleSubmit, pristine, invalid }: FormRenderProps) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>Email</label>
                    <Field name="email" render={(props) => (
                        <TextField {...props} placeholder="Your Email" type="text" /> )}>
                    </Field>
                  </div>
                  <Field name="password" type="password" component={TextField} placeholder="Password" />
                  <Field
                    name="confirmPassword"
                    type="password"
                    component={TextField}
                    placeholder="Confirm Password"
                  />
                  <div>
                    <label>I certify that I am 18 years of age or older</label>
                    <Field name="terms" component={Checkbox} type="checkbox" />
                  </div>
                  <IovButton type="submit" disabled={pristine || invalid}>
                    Continue
                  </IovButton>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
