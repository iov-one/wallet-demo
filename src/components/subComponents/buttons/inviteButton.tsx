import React from "react";
import styled from "styled-components";

import HeartIcon from "../../../../resources/heart_circle.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.button`
  outline: none;
  cursor: pointer;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-right: 16px;
  padding: 0px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Title = styled.div`
  font-family: Muli;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 20.6px;
  letter-spacing: normal;
  color: #000000;
  margin-bottom: 5px;
`;

const Description = styled.div`
  font-family: Muli;
  font-size: 14px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
`;

const ButtonIcon = styled.img`
  width: 51px;
  height: 51px;
  object-fit: contain;
`;

interface InviteButtonProps {
  readonly onInvite: () => any;
}

export const InviteButton = (props: InviteButtonProps): JSX.Element => (
  <Wrapper>
    <Button onClick={props.onInvite}>
      <ButtonIcon src={HeartIcon} />
    </Button>
    <Content>
      <Title>Invite your friends to IOV</Title>
      <Description>Sending & Receiving crypto payments has never been easier</Description>
    </Content>
  </Wrapper>
);
