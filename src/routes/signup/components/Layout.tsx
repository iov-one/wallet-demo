import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import { FormState } from "final-form";
import * as React from "react";
import { Form } from "react-final-form";
import Checkbox from "~/components/forms/Checkbox";
import Field from "~/components/forms/Field";
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

const styles = () =>
  createStyles({
    login: {
      padding: xxl,
    },
    title: {
      maxWidth: "450px",
    },
    page: {
      padding: xxl,
    }
  });

const Layout = ({ onSubmit, classes }: Props): JSX.Element => (
  <Row grow>
    <Col xs={4}>
      <Img src={people} alt="Sign up Image" cover />
    </Col>
    <Col xs={8} layout="column">
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
          <Typography variant="body2">
            Sign up for your IOV wallet below
          </Typography>
        </Block>
        <Form onSubmit={onSubmit}>
          {({ pristine, invalid }: FormState) => (
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
      </Block>
      <Block />
    </Col>
  </Row>
);

export default withStyles(styles, { name: "moe" })(Layout);
