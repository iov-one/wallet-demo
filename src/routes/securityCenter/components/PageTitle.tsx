import React from "react";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import PageLogo from "../assets/pageLogo.svg";

export default (): JSX.Element => (
  <React.Fragment>
    <Block margin="xl" />
    <Img src={PageLogo} alt="Page Logo" />
    <Typography variant="h5" align="center">
      Security Center
    </Typography>
    <Block margin="lg" />
  </React.Fragment>
);
