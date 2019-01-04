import React from "react";
import styled from "styled-components";

import { get } from "lodash";

import { ShareButton } from "../../subComponents/share";

interface ShareGroupProps {
  readonly referralLink: string;
  readonly sharingPlatform: ReadonlyArray<string>;
}

const platformInfo = {
  messenger: {
    icon: "messenger",
    title: "Messenger",
    buildLink: (link: string): string => `fb-messenger://share/?link=${encodeURI(link)}`,
  },
  email: {
    icon: "email",
    title: "Email",
    buildLink: (link: string): string =>
      `mailto:email@address.com?subject=Great+New+Wallet&body=Try it out! ${link}`,
  },
  twitter: {
    icon: "twitter",
    title: "Twitter",
    buildLink: (link: string): string => `http://twitter.com/share?text=Great+New+Wallet&url=${link}`,
  },
  whatsapp: {
    icon: "whatsapp",
    title: "Whatsapp",
    buildLink: (link: string): string => `whatsapp://send?text=${link}`,
  },
  telegram: {
    icon: "telegram",
    title: "Telegram",
    buildLink: (link: string): string => `https://telegram.me/share/url?url=${link}&text=Great+New+Wallet`,
  },
};

// see: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/15947692/
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const ShareGroup = (props: ShareGroupProps) => {
  const { referralLink, sharingPlatform } = props;
  return (
    <Wrapper>
      {sharingPlatform.map((val, idx) => {
        const info = get(platformInfo, val, platformInfo.messenger);
        return <ShareButton referralLink={referralLink} {...info} key={`shareItem_${idx}`} />;
      })}
    </Wrapper>
  );
};
