import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { FormState } from "final-form";
import * as React from "react";
import Field from "~/components/forms/Field";
import Form from "~/components/forms/Form";
import TextField from "~/components/forms/TextField";
import Block from "~/components/layout/Block";
import Button from "~/components/layout/Button";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import Typography from "~/components/layout/Typography";
import FormSpace from "./FormSpace";
import TermsSection from "./TermsSection";

interface Props {
  readonly onSubmit: (values: object) => void;
}

const SignupFormSection = ({ onSubmit }: Props) => (
  <React.Fragment>
    <Form onSubmit={onSubmit} grow>
      {({ submitting }: FormState) => (
        <React.Fragment>
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
              placeholder="Password"
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
              placeholder="Confirm Password"
            />
          </Block>
          <Block padding="xxl">
            <TermsSection />
          </Block>
          <FormSpace />
          <Grid nowrap shrink>
            <GridItem grow center="xs" end="xs">
              <Block margin="md" padding="xxl">
                <Button variant="contained" color="primary" type="submit" disabled={submitting} size="large">
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
