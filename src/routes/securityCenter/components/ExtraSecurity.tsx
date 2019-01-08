import * as React from "react";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";
import AdvancedSecurity from "./AdvancedSecurity";

//Remove line this comment and line below in case if interface will get any memebers
//tslint:disable-next-line:no-empty-interface
interface OuterProps {}

type Props = OpenType & OpenHandler & OuterProps;

const ExtraSecurity = ({ open, toggle }: Props): JSX.Element => (
  <React.Fragment>
    <Block margin="xs">
      <Typography align="center" variant="subtitle1" color="textPrimary">
        Extra security?
      </Typography>
    </Block>
    <Block margin="lg">
      <Typography align="center" variant="subtitle1" color="primary" underlined pointer onClick={toggle}>
        See advanced security
      </Typography>
    </Block>
    <AdvancedSecurity showAdvancedSecurity={open} closeAdvancedSecurity={toggle} />
  </React.Fragment>
);

export default openHoc<OuterProps>(ExtraSecurity);
