import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { FormState } from "final-form";
import * as React from "react";
import Checkbox from "~/components/forms/Checkbox";
import Field from "~/components/forms/Field";
import Form from "~/components/forms/Form";
import TextField from "~/components/forms/TextField";
import Block from "~/components/layout/Block";
import Button from "~/components/layout/Button";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Link from "~/components/layout/Link";
import Typography from "~/components/layout/Typography";
import { LOG_IN_ROUTE, PRIVACY_POLICY_ROUTE, TERMS_OF_SERVICE_ROUTE } from "~/containers/routes";
import people from "~/routes/signup/assets/People.svg";

interface Props {
  readonly onSubmit: (values: object) => void;
}

const Layout = ({ onSubmit }: Props): JSX.Element => (
  <Grid root>
    <GridItem maxwidth="sm" xs={12} sm={4}>
      <Block grow>
        <Img src={people} alt="Sign up Image" cover />
      </Block>
    </GridItem>
    <GridItem xs={12} sm={8} growSm={4} variant="column" padding="xxl">
      <Block padding="xxl" align="right" margin="xxl">
        <Typography variant="body2" inline>
          {"Already have an account?\u00a0"}
        </Typography>
        <Link to={LOG_IN_ROUTE}>
          <Typography variant="body2" color="primary" underlined inline>
            Log In
          </Typography>
        </Link>
      </Block>
      <Block padding="xxl" maxWidth={450} margin="sm">
        <Typography variant="h4" color="primary" inline>
          {"Get started\u00a0"}
        </Typography>
        <Typography variant="h4" inline>
          with your first blockchain wallet.
        </Typography>
      </Block>
      <Block padding="xxl" margin="xl">
        <Typography variant="h6" color="textSecondary">
          Sign up for your IOV wallet below
        </Typography>
      </Block>
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
              <Grid shrink nowrap>
                <GridItem top="xs">
                  <Field fontSize="small" name="terms" component={Checkbox} type="checkbox" />
                </GridItem>
                <GridItem variant="column">
                  <Typography variant="subtitle2" color="textSecondary" inline>
                    {"I certify that I am 18 years of age or older, and I agree to the\u00a0"}
                  </Typography>
                  <Block>
                    <Link to={TERMS_OF_SERVICE_ROUTE}>
                      <Typography variant="body2" color="primary" underlined inline>
                        Terms of Service
                      </Typography>
                    </Link>
                    <Typography variant="subtitle2" color="textSecondary" inline>
                      {"\u00a0&\u00a0"}
                    </Typography>
                    <Link to={PRIVACY_POLICY_ROUTE}>
                      <Typography variant="body2" color="primary" underlined inline>
                        Privacy Policy
                      </Typography>
                    </Link>
                  </Block>
                </GridItem>
              </Grid>
            </Block>
            <Block grow margin="xxl" />
            <Hairline />
            <Block margin="md" />
            <Grid nowrap shrink>
              <GridItem grow center="xs" end="xs">
                <Block margin="md" padding="xxl">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
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
    </GridItem>
  </Grid>
);

export default Layout;
