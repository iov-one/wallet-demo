import * as React from "react";
import Block from "~/components/layout/Block";
import Link from "~/components/layout/Link";
import Typography from "~/components/layout/Typography";
import { ADVANCED_SECURITY_ROUTE } from "~/routes";


const ExtraSecurity = (): JSX.Element => (
  <React.Fragment>
    <Block margin="xs">
      <Typography align="center" variant="subtitle1" color="textPrimary">
        Extra security?
      </Typography>
    </Block>
    <Block margin="lg">
      <Link to={ADVANCED_SECURITY_ROUTE}>
        <Typography align="center" variant="subtitle1" color="primary" underlined>
          See advanced security
        </Typography>
      </Link>
    </Block>
  </React.Fragment>
);

export default ExtraSecurity;
