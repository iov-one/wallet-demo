import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

import { AccountName, Description } from "../../subComponents/typography";
import { TextCopy } from "../../compoundComponents/form";

const CopyWrapper = styled.div`
  margin-top: 50px;
`;

const customStyle = {
  overlay: {
    backgroundColor: "rgba(54, 54, 54, 0.7)",
  },
};

interface ReceiveModalProps {
  readonly name: string;
  readonly address: string;
  readonly visible: boolean;
  readonly onRequestClose?: () => any;
}

export const ReceiveModal = (props: ReceiveModalProps) => {
  const { name, address, visible, onRequestClose } = props;
  return (
    <Modal style={customStyle} isOpen={visible} onRequestClose={onRequestClose}>
      <AccountName className="noBorder">{name}</AccountName>
      <Description>If you want to receive IOV from a IOV wallet, please send them this address.</Description>
      <CopyWrapper>
        <TextCopy title="Your IOV address" value={address} notification="Link copied!" />
      </CopyWrapper>
    </Modal>
  );
};
