import * as React from "react";
import styled from "styled-components";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import Spacer from "~/components/layout/Spacer";
import PageMenu from "~/components/pages/PageMenu";
import { lg, xxl } from "~/theme/variables";
import LaptopMan from "../../resources/laptop_man.svg";
import { InviteDescription, InviteInfo } from "./sections";

const LaptopManImg = styled.div`
  background-image: url(${LaptopMan});
  background-size: 100%;
  background-repeat: no-repeat;
  width: 277.1px;
  right: 0px;
  z-index: 1;
  position: relative;
  height: 700px;
  margin: auto 0 auto auto;
  background-position: 50%;
`;

export class InvitePage extends React.Component<{}> {
  public render(): JSX.Element {
    const inviteStyle = {
      marginLeft: lg,
      marginRight: lg,
      marginBottom: lg,
    };
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
          <InviteInfo style={phone ? undefined : inviteStyle} referralLink="http://iov.one" />
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
