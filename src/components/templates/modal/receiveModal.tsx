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
  content: {
    left: "calc(50vw - 274px)",
    top: "calc(50vh - 225px)",
    width: "548px",
    height: "450px",
    padding: "30px 50px",
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
    <Modal style={customStyle} isOpen={visible} onRequestClose={onRequestClose} ariaHideApp={false}>
      <AccountName className="noBorder">{name}</AccountName>
      <Description>
        If you want to receive Lisk from a non-IOV wallet, please send them this address instead of your value
        name.
      </Description>
      <CopyWrapper>
        <TextCopy title="Your IOV address" value={address} notification="Link copied!" />
      </CopyWrapper>
    </Modal>
  );
};
