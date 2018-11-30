import React from "react";
import styled from "styled-components";

import { H1 } from "../../subComponents/typography";

import ArrowIcon from "../../../../resources/long_down_arrow.svg";
import LaptopMan from "../../../../resources/laptop_man.svg";

const InviteDescriptionWrapper = styled.div`
  margin-top: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 130px;
`;

const MainText = styled(H1)`
  margin-bottom: 50px;
  letter-spacing: normal;
`;

const HighLight = styled.span`
  color: #31e6c9;
`;

const InviteDescriptionLabel = styled.div`
  opacity: 0.9;
  font-family: Muli;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 19.7px;
  letter-spacing: normal;
  color: #2d2f30;
  text-align: center;
`;

const ContentWrapper = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LaptopManImg = styled.div`
  background-image: url(${LaptopMan});
  background-size: 277.1px 378.8px;
  background-repeat: no-repeat;
  width: 277.1px;
  height: 379.8px;
  position: fixed;
  top: calc(50vh - 150px);
  right: 0px;
  z-index: 1;
`;

const InviteDescriptionField = styled.div`
  width: 290px;
  height: 40px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 0 6px 0 #f3f4fb;
  box-sizing: border-box;
  margin-top: 7px;
  font-family: Muli;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 22.5px;
  letter-spacing: normal;
  text-align: center;
  padding-top: 8px;
  color: #2d2f30cc;
  &.highlight {
    color: #2d2f30;
  }
`;

const ArrowImage = styled.img`
  width: 20px;
  height: 38px;
  margin: 30px 0px;
`;

export const InviteDescription = (): JSX.Element => (
  <InviteDescriptionWrapper>
    <LaptopManImg />
    <ContentWrapper>
      <MainText className="center">
        Let’s make life <HighLight>simple.</HighLight>
      </MainText>
      <InviteDescriptionLabel>Instead of having an address like this</InviteDescriptionLabel>
      <InviteDescriptionField>1DkyBEKt5S2G...AvnsRyHoYM</InviteDescriptionField>
      <ArrowImage src={ArrowIcon} />
      <InviteDescriptionLabel>IOV provides an address like this</InviteDescriptionLabel>
      <InviteDescriptionField className="highlight">John*iov</InviteDescriptionField>
    </ContentWrapper>
  </InviteDescriptionWrapper>
);
