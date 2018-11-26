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

interface Props {
  readonly onSubmit: (values: object) => void;
}

const Layout = ({ onSubmit }: Props): JSX.Element => (
  <Row grow>
    <Col xs={4}>
      <Img src={people} alt="Sign up Image" cover />
    </Col>
    <Col xs={8} layout="column">
      <Block align="right">
        <Typography variant="subtitle1">Already have an account?</Typography>
        <Link to={LOG_IN_ROUTE}>
          <Typography variant="subtitle1" underlined>
            {" "}
            Log in
          </Typography>
        </Link>
      </Block>
      <Block />
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
      <Block />
    </Col>
  </Row>
);

export default Layout;
