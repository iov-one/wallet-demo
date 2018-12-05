import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { FormState } from "final-form";
import * as React from "react";
import Field from "~/components/forms/Field";
import Form, { Errors } from "~/components/forms/Form";
import TextField from "~/components/forms/TextField";
import { required, validEmail } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Button from "~/components/layout/Button";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import Hairline from "~/components/layout/Hairline";
import Typography from "~/components/layout/Typography";
import PolicySection from "./PolicySection";

interface Props {
  readonly onSubmit: (values: object) => void;
}

const validate = (values: any) => {
  let errors: Errors = {};
  if (values.password !== values.confirmPassword) {
    errors = { ...errors, confirmPassword: "Passwords do not match" };
  }

  return errors;
};

const SignupFormSection = ({ onSubmit }: Props) => (
  <React.Fragment>
    <Form onSubmit={onSubmit} validation={validate} grow>
      {({ submitting, valid, validating }: FormState) => (
        <React.Fragment>
          <Block scroll grow>
            <Block padding="xxl" maxWidth={450}>
              <Typography variant="subtitle2" color="textPrimary">
                Email
              </Typography>
              <Field
                variant="outlined"
                margin="dense"
                name="email"
                type="text"
                fullWidth
                validate={validEmail}
                component={TextField}
                placeholder="Your Email"
              />
            </Block>
            <Block padding="xxl" maxWidth={450}>
              <Typography variant="subtitle2" color="textPrimary">
                Password
              </Typography>
              <Field
                variant="outlined"
                margin="dense"
                name="password"
                type="password"
                fullWidth
                component={TextField}
                validate={required}
                placeholder="Create a password"
              />
            </Block>
            <Block padding="xxl" maxWidth={450}>
              <Typography variant="subtitle2" color="textPrimary">
                Confirm Password
              </Typography>
              <Field
                variant="outlined"
                margin="dense"
                name="confirmPassword"
                type="password"
                fullWidth
                component={TextField}
                validate={required}
                placeholder="Repeat your password"
              />
            </Block>
            <Block padding="xxl">
              <PolicySection />
            </Block>
          </Block>
          <Grid nowrap shrink>
            <GridItem grow center="xs" end="xs">
          <Hairline />
          <Block margin="md" />
              <Block margin="md" padding="xxl">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!valid || submitting || validating}
                  size="large"
                >
                  {"Continue\u00a0"}
                  <ArrowForwardIcon fontSize="small" />
                </Button>
              </Block>
            </GridItem>
          </Grid>
        </React.Fragment>
      )}
    </Form>
  </React.Fragment>
);

export default SignupFormSection;
