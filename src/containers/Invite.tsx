import * as React from "react";
import styled from "styled-components";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import Spacer from "~/components/layout/Spacer";
import PageMenu from "~/components/pages/PageMenu";
import { xxl } from "~/theme/variables";
import LaptopMan from "../../resources/laptop_man.svg";
import { InviteDescription, InviteInfo } from "../components/templates/sections";

const LaptopManImg = styled.div`
  background-image: url(${LaptopMan});
  background-size: 277.1px 378.8px;
  background-repeat: no-repeat;
  width: 277.1px;
  right: 0px;
  z-index: 1;
  position: relative;
  height: calc(100vh - 100px);
  margin: auto 0 auto auto;
  background-position: 50%;
`;

export class InvitePage extends React.Component<{}> {
  public render(): JSX.Element {
    const descriptionStyle = {
      marginLeft: xxl,
      marginTop: "140px",
    };

    const descriptionPhoneStyle = {
      marginTop: xxl,
    };

    const renderProps = (phone: boolean) => (
      <Grid>
        <GridItem xs={12} md={6}>
          <Spacer order={1} />
          <InviteInfo referralLink="http://iov.one" />
          <Spacer order={1} />
        </GridItem>
        <GridItem xs={12} md={6} center="xs">
          <InviteDescription style={phone ? descriptionPhoneStyle : descriptionStyle} />
          {!phone && <LaptopManImg />}
        </GridItem>
        {phone && (
          <GridItem xs={12} center="xs" middle="xs">
            <LaptopManImg />
          </GridItem>
        )}
      </Grid>
    );

    return <PageMenu padding={false} renderProps={renderProps} />;
  }
}
