import * as React from "react";
import Checkbox from "~/components/forms/Checkbox";
import Field from "~/components/forms/Field";
import Block from "~/components/layout/Block";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import Link from "~/components/layout/Link";
import Typography from "~/components/layout/Typography";
import { PRIVACY_POLICY_ROUTE, TERMS_OF_SERVICE_ROUTE } from "~/containers/routes";

const TermsSection = () => (
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
);

export default TermsSection;
