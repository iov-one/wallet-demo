import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

import CloseIcon from "../../../../resources/close.svg";

import { SuggestionButton } from "../../subComponents/buttons";

const CloseButton = styled.button`
  width: 26px;
  height: 26px;
  background-image: url(${CloseIcon});
  background-size: contain,
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  align-self: flex-end;
  cursor: pointer;
  outline: none;
  border: none;
  margin-bottom: 37px;
`;

const ModalContentWrapper = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 14px 0 #edeff4;
`;

const ModalUpperPart = styled.div`
  display: flex;
  flex-direction: column;
`;

const customStyle = {
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    zIndex: 999,
  },
  content: {
    left: "calc(50vw - 273px)",
    width: "506px",
    paddingTop: "140px",
    paddingBottom: "85px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    border: "none",
  },
};

interface ModalProps {
  readonly suggestionText: string;
  readonly buttonText: string;
  readonly onSuggestion: () => any;
  readonly onRequestClose: () => any;
  readonly visible: boolean;
  readonly children: JSX.Element;
}

export const IOVModal = (props: ModalProps): JSX.Element => (
  <Modal style={customStyle} isOpen={props.visible} ariaHideApp={false}>
    <ModalUpperPart>
      <CloseButton onClick={props.onRequestClose} />
      <ModalContentWrapper>{props.children}</ModalContentWrapper>
    </ModalUpperPart>
    <SuggestionButton
      suggestionText={props.suggestionText}
      buttonText={props.buttonText}
      onClick={props.onSuggestion}
    />
  </Modal>
);