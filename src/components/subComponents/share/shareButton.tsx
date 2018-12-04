import React from "react";
import styled from "styled-components";

import { get } from "lodash";

import EmailIcon from "../../../../resources/icon-social-email.svg";
import MessengerIcon from "../../../../resources/icon-social-messenger.svg";
import TelegramIcon from "../../../../resources/icon-social-telegram.svg";
import TwitterIcon from "../../../../resources/icon-social-twitter.svg";
import WhatsappIcon from "../../../../resources/icon-social-whatsapp.svg";

const Icons = {
  messenger: MessengerIcon,
  email: EmailIcon,
  telegram: TelegramIcon,
  twitter: TwitterIcon,
  whatsapp: WhatsappIcon,
};

const Wrapper = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  text-decoration: none;
`;

const Icon = styled.img`
  width: 78px;
  height: 78px;
`;

const Title = styled.div`
  font-family: Muli;
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 22.9px;
  letter-spacing: normal;
  color: #090909;
  text-align: center;
`;

interface ShareButtonProps {
  readonly referralLink: string;
  readonly icon: string;
  readonly title: string;
  readonly buildLink: (link: string) => string;
}

export const ShareButton = (props: ShareButtonProps): JSX.Element => (
  <Wrapper href={props.buildLink(props.referralLink)}>
    <Icon src={get(Icons, props.icon)} />
    <Title>{props.title}</Title>
  </Wrapper>
);
