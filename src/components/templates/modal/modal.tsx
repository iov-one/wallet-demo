import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

import { isEmpty } from "lodash";

import CloseIcon from "../../../../resources/close_type2.svg";

import { SuggestionButton } from "../../subComponents/buttons";

const CloseButton = styled.button`
  min-width: 26px;
  min-height: 26px;
  margin: 0px;
  padding: 0px;
  margin-bottom: 37px;
  background-image: url(${CloseIcon});
  background-size: contain,
  background-position: center;
  background-repeat: no-repeat;
  background-color: transparent;
  align-self: flex-end;
  cursor: pointer;
  outline: none;
  border: none;
`;

const ModalContentWrapper = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 14px 0 #edeff4;
`;

const ModalUpperPart = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 36px;
`;

const SuggestionWrapper = styled.div`
  margin-bottom: 74px;
`;

const SecondaryCompWrapper = styled.div`
  margin-left: 16px;
  margin-bottom: 70px;
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
    top: "0px",
    bottom: "0px",
    paddingTop: "80px",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent",
    border: "none",
    overflow: "inherit",
  },
};

interface ModalProps {
  readonly suggestionText: string;
  readonly buttonText: string;
  readonly onSuggestion: () => any;
  readonly onRequestClose: () => any;
  readonly visible: boolean;
  readonly children: JSX.Element;
  readonly secondaryComp?: JSX.Element;
}

export const IOVModal = (props: ModalProps): JSX.Element => (
  <Modal style={customStyle} isOpen={props.visible} ariaHideApp={false}>
    <ModalUpperPart>
      <CloseButton onClick={props.onRequestClose} />
      <ModalContentWrapper>{props.children}</ModalContentWrapper>
    </ModalUpperPart>
    <SuggestionWrapper>
      <SuggestionButton
        suggestionText={props.suggestionText}
        buttonText={props.buttonText}
        onClick={props.onSuggestion}
      />
    </SuggestionWrapper>
    <SecondaryCompWrapper>{props.secondaryComp}</SecondaryCompWrapper>
  </Modal>
);
