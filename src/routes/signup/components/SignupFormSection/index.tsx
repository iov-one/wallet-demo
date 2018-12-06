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
import LoginSection from "../LoginSection";
import SubtitleSection from "../SubtitleSection";
import TitleSection from "../TitleSection";
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
          <Block scroll grow offset={2}>
            <Block padding="xxl" align="right" margin="md">
              <LoginSection />
            </Block>
            <Block padding="xxl" maxWidth={450} margin="md">
              <TitleSection />
            </Block>
            <Block padding="xxl" maxWidth={450} margin="md">
              <TitleSection />
            </Block>
            <Block padding="xxl" maxWidth={450} margin="md">
              <TitleSection />
            </Block>
            <Block padding="xxl" maxWidth={450} margin="md">
              <TitleSection />
            </Block>
            <Block padding="xxl" maxWidth={450} margin="md">
              <TitleSection />
            </Block>
            <Block padding="xxl" maxWidth={450} margin="md">
              <TitleSection />
            </Block>
            <Block padding="xxl" margin="xl">
              <SubtitleSection />
            </Block>
            <Block padding="xxl" maxWidth={450} margin="xl">
              <Block margin="sm">
                <Typography variant="subtitle2" color="textPrimary">
                  Email
                </Typography>
              </Block>
              <Field
                variant="outlined"
                name="email"
                type="text"
                fullWidth
                validate={validEmail}
                component={TextField}
                placeholder="Your Email"
              />
            </Block>
            <Block padding="xxl" maxWidth={450} margin="xl">
              <Block margin="sm">
                <Typography variant="subtitle2" color="textPrimary">
                  Password
                </Typography>
              </Block>
              <Field
                variant="outlined"
                name="password"
                type="password"
                fullWidth
                component={TextField}
                validate={required}
                placeholder="Create a password"
              />
            </Block>
            <Block padding="xxl" maxWidth={450} margin="xl">
              <Block margin="sm">
                <Typography variant="subtitle2" color="textPrimary">
                  Confirm Password
                </Typography>
              </Block>
              <Field
                variant="outlined"
                name="confirmPassword"
                type="password"
                fullWidth
                component={TextField}
                validate={required}
                placeholder="Repeat your password"
              />
            </Block>
            <Block padding="xxl" margin="xl">
              <PolicySection />
            </Block>
          </Block>

          <Hairline />
          <Block margin="md" />
          <Grid nowrap noshrink nogrow>
            <GridItem xs={12} sm={12} grow center="xs" end="xs">
              <Block margin="md" offset={2} padding="xxl">
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
