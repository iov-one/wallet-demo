import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import styled from "styled-components";

import { Input } from "../../subComponents/input";
import { Button } from "../../subComponents/buttons";
import { InputNotification, TextFieldLabel } from "../../subComponents/typography";

const Wrapper = styled.div``;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface ConfirmProps {
  readonly title: string;
  readonly notification: string;
  readonly [prop: string]: any;
}

interface ConfirmState {
  readonly checked: boolean;
}

export class ConfirmInput extends React.Component<ConfirmProps, ConfirmState> {
  public readonly state = {
    checked: false,
  };
  public readonly copied = (): any => {
    this.setState({
      checked: true,
    });
  };
  render() {
    const { title, notification } = this.props;
    const { checked } = this.state;
    return (
      <Wrapper>
        <TextFieldLabel>{title}</TextFieldLabel>
        <ContentWrapper>
          <Input style={{ marginRight: "8px" }} className="confirm" {...this.props} disabled />
          <CopyToClipboard text={this.props.value} onCopy={this.copied}>
            <Button title="Copy!" type="primary" icon="check" checked={checked} />
          </CopyToClipboard>
        </ContentWrapper>
        {checked && <InputNotification className="confirm">{notification}</InputNotification>}
      </Wrapper>
    );
  }
}
