import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import styled from "styled-components";

import { CheckStatusButton } from "../../subComponents/buttons";
import { FieldLabel } from "../../subComponents/typography";

const Wrapper = styled.div``;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border-radius: 4px;
  border: solid 1px #e9eaf0;
  background-color: #f4f5f8;
  font-family: Open Sans;
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: 0.8px;
  color: #1c1c1c;
  margin-right: 7px;
`;

const Notification = styled.div`
  font-family: Open Sans;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.63;
  letter-spacing: 0.7px;
  color: #45e9cf;
  margin-top: 20px;
`;

export class TextCopy extends React.Component<any> {
  public readonly state = {
    checked: false,
  };
  public readonly copied = (): any => {
    this.setState({
      checked: true,
    });
  };
  public render(): JSX.Element {
    const { title, value, notification } = this.props;
    const { checked } = this.state;
    return (
      <Wrapper>
        <FieldLabel title={title} />
        <Content>
          <Input type="text" value={value} disabled {...this.props} />
          <CopyToClipboard text={value} onCopy={this.copied}>
            <CheckStatusButton title="Copy!" checked={checked} />
          </CopyToClipboard>
        </Content>
        {checked && <Notification>{notification}</Notification>}
      </Wrapper>
    );
  }
}
