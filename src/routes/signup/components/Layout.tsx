import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import { FormState } from "final-form";
import * as React from "react";
import Checkbox from "~/components/forms/Checkbox";
import Field from "~/components/forms/Field";
import Form from "~/components/forms/Form";
import TextField from "~/components/forms/TextField";
import Block from "~/components/layout/Block";
import Button from "~/components/layout/Button";
import Col from "~/components/layout/Col";
import Img from "~/components/layout/Image";
import Link from "~/components/layout/Link";
import Row from "~/components/layout/Row";
import Typography from "~/components/layout/Typography";
import { LOG_IN_ROUTE } from "~/containers/routes";
import people from "~/routes/signup/assets/People.svg";
import { xxl } from "~/theme/variables";

interface Props extends WithStyles<typeof styles> {
  readonly onSubmit: (values: object) => void;
}

const styles = createStyles({
  login: {
    padding: xxl,
  },
  title: {
    maxWidth: "450px",
  },
  page: {
    padding: xxl,
  },
  image: {
    height: "100%",
    maxWidth: " 420px",
  },
  // Unfortunately is not possible to use constants here
  // see: https://stackoverflow.com/questions/33194138/template-string-as-object-property-name
  "@media (max-width: 480px)": {
    image: {
      maxHeight: "250px",
    },
  },
  form: {
    maxWidth: "450px",
  },
});

const imgOrder = {
  xs: 2,
};

const infoOrder = {
  xs: 1,
};

const Layout = ({ onSubmit, classes }: Props): JSX.Element => (
  <Row grow>
    <Col xs={12} order={imgOrder} sm={4} className={classes.image}>
      <Img src={people} alt="Sign up Image" cover />
    </Col>
    <Col xs={12} order={infoOrder} sm={8} layout="column">
      <Block align="right" className={classes.login}>
        <Typography variant="body2">Already have an account?&nbsp;</Typography>
        <Link to={LOG_IN_ROUTE}>
          <Typography variant="body2" color="primary" underlined>
            Log In
          </Typography>
        </Link>
      </Block>
      <Block className={classes.page}>
        <Block className={classes.title} margin="sm">
          <Typography variant="h4" color="primary" inline>
            Get started&nbsp;
          </Typography>
          <Typography variant="h4" inline>
            with your first blockchain wallet.
          </Typography>
        </Block>
        <Block margin="xl">
          <Typography variant="body2" color="textSecondary">
            Sign up for your IOV wallet below
          </Typography>
        </Block>
        <Form onSubmit={onSubmit} className={classes.form}>
          {({ pristine, invalid }: FormState) => (
            <React.Fragment>
              <Block>
                <Typography variant="subtitle2" color="textPrimary">
                  Email
                </Typography>
                <Field
                  variant="outlined"
                  margin="dense"
                  name="email"
                  type="text"
                  component={TextField}
                  placeholder="Your Email"
                />
              </Block>
              <Block>
                <Typography variant="subtitle2" color="textPrimary">
                  Password
                </Typography>
                <Field
                  variant="outlined"
                  margin="dense"
                  name="password"
                  type="password"
                  component={TextField}
                  placeholder="Password"
                />
              </Block>
              <Block>
                <Typography variant="subtitle2" color="textPrimary">
                  Confirm Password
                </Typography>
                <Field
                  variant="outlined"
                  margin="dense"
                  name="confirmPassword"
                  type="password"
                  component={TextField}
                  placeholder="Confirm Password"
                />
              </Block>
              <Col margin="sm">
                <Field name="terms" component={Checkbox} type="checkbox" />
                <Typography variant="subtitle2" color="textSecondary" inline>
                  I certify that I am 18 years of age or older
                </Typography>
              </Col>
              <Button type="submit" disabled={pristine || invalid}>
                Continue
              </Button>
            </React.Fragment>
          )}
        </Form>
      </Block>
      <Block />
    </Col>
  </Row>
);

export default withStyles(styles)(Layout);
