import React from "react";
import styled from "styled-components";

import { get } from "lodash";

import NoNotificationsIcon from "../../../../resources/no_notification_icon.svg";
import NoPendingTransactionsIcon from "../../../../resources/no_pending_transaction_icon.svg";

const ContentInfo = {
  noNotification: {
    icon: NoNotificationsIcon,
    text: "You’re up to date!",
  },
  noPending: {
    icon: NoPendingTransactionsIcon,
    text: "Nothing here...",
  },
};

const Wrapper = styled.div`
  padding: 40px;
  box-sizing: border-box;
  width: 323px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Icon = styled.img`
  width: 70px;
  height: 70px;
  margin-bottom: 20px;
`;
const Text = styled.div`
  font-family: Muli;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 26px;
  letter-spacing: 0.7px;
  color: #1c1c1c;
`;

interface EmptyStateProps {
  readonly type: string;
}

export const NotificationEmptyState = (props: EmptyStateProps): JSX.Element => {
  const content = get(ContentInfo, props.type);
  return (
    <Wrapper>
      <Icon src={content.icon} />
      <Text>{content.text}</Text>
    </Wrapper>
  );
};
