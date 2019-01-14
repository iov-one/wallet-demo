import * as React from "react";
import Checkbox from "~/components/forms/Checkbox";
import Field from "~/components/forms/Field";
import { required } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import Typography from "~/components/layout/Typography";
import { PRIVACY_POLICY_ROUTE, TERMS_OF_SERVICE_ROUTE } from "~/routes";

// Note that react-router-dom link cannot handle external URLS
// I replaced it with a standard a for now
// https://github.com/ReactTraining/react-router/issues/1147
const PolicySection = () => (
  <Grid noshrink nowrap>
    <GridItem top="xs">
      <Field
        validate={required}
        disableRipple
        fontSize="small"
        name="terms"
        component={Checkbox}
        type="checkbox"
      />
    </GridItem>
    <GridItem variant="column">
      <Typography variant="body2" color="textSecondary" inline>
        {"I certify that I am 18 years of age or older, and I agree to the\u00a0"}
      </Typography>
      <Block margin="md">
        <a href={TERMS_OF_SERVICE_ROUTE}>
          <Typography variant="body2" color="primary" underlined inline>
            Terms of Service
          </Typography>
        </a>
        <Typography variant="body2" color="textSecondary" inline>
          {"\u00a0&\u00a0"}
        </Typography>
        <a href={PRIVACY_POLICY_ROUTE}>
          <Typography variant="body2" color="primary" underlined inline>
            Privacy Policy
          </Typography>
        </a>
      </Block>
    </GridItem>
  </Grid>
);

export default PolicySection;
