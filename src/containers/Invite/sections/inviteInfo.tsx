import React from "react";
import styled from "styled-components";

import { ConfirmInput } from "~/components/compoundComponents/form";
import { H1, H2 } from "~/components/subComponents/typography";
import { InviteInfoWrapper } from "~/components/subComponents/wrappers";
import { ShareGroup } from "./components/ShareGroup";

interface InviteInfoProps {
  readonly referralLink: string;
  readonly style?: React.CSSProperties;
}

const MainText = styled(H1)`
  margin-bottom: 17px;
`;
const Description = styled(H2)`
  color: #6f749a;
  margin-bottom: 48px;
`;

const ShareText = styled.div`
  font-family: Muli;
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 22.9px;
  letter-spacing: normal;
  color: #090909;
  margin-top: 40px;
  margin-bottom: 36px;
  text-align: center;
`;

export class InviteInfo extends React.Component<InviteInfoProps> {
  public render(): JSX.Element {
    const { referralLink, style } = this.props;
    return (
      <InviteInfoWrapper style={style}>
        <React.Fragment>
          <MainText className="center">Share the love of IOV</MainText>
          <Description className="center">
            Introduce a friend to the IOV wallet by sharing them the link below.
          </Description>
          <ConfirmInput
            title={`Your IOV referral link`}
            value={referralLink}
            notification={`Your referral link copied!`}
          />
          <ShareText>or share on</ShareText>
          <ShareGroup
            referralLink={referralLink}
            sharingPlatform={["messenger", "twitter", "whatsapp", "telegram", "email"]}
          />
        </React.Fragment>
      </InviteInfoWrapper>
    );
  }
}
