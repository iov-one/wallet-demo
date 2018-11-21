import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.button`
  outline: none;
  cursor: pointer;
  width: 51px;
  height: 51px;
  border-radius: 50%;
  opacity: 0.4;
  background-color: #98f3e4;
  border: 1px solid #31e6c9;
  margin-right: 16px;
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

interface InviteButtonProps {
  readonly onInvite: () => any;
}

export const InviteButton = (props: InviteButtonProps): JSX.Element => (
  <Wrapper>
    <Button onClick={props.onInvite} />
    <Content>
      <Title>Invite your friends to IOV</Title>
      <Description>Sending & Receiving crypto payments has never been easier</Description>
    </Content>
  </Wrapper>
);
