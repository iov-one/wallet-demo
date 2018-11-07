import React from "react";
import styled from "styled-components";

import { Spinner } from "../icons";

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Wrapper = styled.div`
  padding: 15px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #f3f3f3;
  &:last-child {
    border-bottom: none;
  }
`;

const TransInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  width: 222px;
  height: 20px;
  font-family: Muli;
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 18px;
  letter-spacing: normal;
  color: #1c1c1c;
  margin-bottom: 1px;
`;

const Bold = styled.span`
  font-weight: 600;
`;

const Grey = styled.div`
  font-family: Muli;
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #dadada;
`;

export interface PendingNotificationItemProps {
  readonly receiver: string;
  readonly amount: number;
  readonly unit: string;
}

export const PendingNotificationItem = (props: PendingNotificationItemProps): JSX.Element => (
  <Wrapper>
    <Content>
      <Spinner className="secondary" />
      <TransInfo>
        <Message>
          <Bold>
            {props.amount} {props.unit}
          </Bold>{" "}
          to <Bold>{props.receiver}</Bold>
        </Message>
        <Grey>..sending</Grey>
      </TransInfo>
    </Content>
  </Wrapper>
);
