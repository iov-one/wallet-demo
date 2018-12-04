import React from "react";
import styled from "styled-components";

import { CoinInfo, coinToString, TransNotificationInfo } from "../../../logic";

import ReceiveIcon from "../../../../resources/receive_transaction.svg";
import SendIcon from "../../../../resources/send_transaction.svg";

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

const Icon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  margin-right: 18px;
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
  margin-bottom: 5px;
`;

const Bold = styled.span`
  font-weight: 600;
`;

const Time = styled.div`
  font-family: Muli;
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #dadada;
`;

export const TransactionNotificationItem = (props: TransNotificationInfo): JSX.Element => {
  const { signerAddr, signerName, recipientAddr, recipientName } = props;
  const signer = signerName || signerAddr;
  const recipient = recipientName || recipientAddr;
  const { amount } = props.transaction;
  const coinInfo: CoinInfo = {
    fractional: amount.fractional,
    whole: amount.whole,
    // TODO: we need to clean this up with new iov-core 0.10
    sigFigs: 9,
  };
  const coinInString = coinToString(coinInfo);
  return (
    <Wrapper>
      <Content>
        <Icon src={props.received ? ReceiveIcon : SendIcon} />
        <TransInfo>
          {props.success ? (
            <Message>
              {props.received ? <Bold>{signer}</Bold> : "You"} sent{" "}
              {props.received ? "you" : <Bold>{recipient}</Bold>}{" "}
              <Bold>
                {coinInString} {amount.tokenTicker}
              </Bold>
            </Message>
          ) : (
            <Message>
              Your payment to <Bold>{recipient}</Bold> failed
            </Message>
          )}
          <Time>{props.time.toLocaleString()}</Time>
        </TransInfo>
      </Content>
    </Wrapper>
  );
};
