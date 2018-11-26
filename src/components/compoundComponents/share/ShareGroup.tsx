import React from "react";
import styled from "styled-components";

import { get } from "lodash";

import { ShareButton } from "../../subComponents/share";

interface ShareGroupProps {
  readonly shareLink: string;
  readonly sharingPlatform: ReadonlyArray<string>;
}

const platformInfo = {
  messenger: {
    icon: "messenger",
    title: "Messenger",
  },
  email: {
    icon: "email",
    title: "Email",
  },
  twitter: {
    icon: "twitter",
    title: "Twitter",
  },
  whatsapp: {
    icon: "twitter",
    title: "Whatsapp",
  },
  telegram: {
    icon: "whatsapp",
    title: "Telegram",
  },
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ShareGroup = (props: ShareGroupProps) => {
  const { shareLink, sharingPlatform } = props;
  return (
    <Wrapper>
      {sharingPlatform.map((val, idx) => {
        const info = get(platformInfo, val, {
          icon: "messenger",
          title: "Messenger",
        });
        return <ShareButton shareLink={shareLink} {...info} key={`shareItem_${idx}`} />;
      })}
    </Wrapper>
  );
};
