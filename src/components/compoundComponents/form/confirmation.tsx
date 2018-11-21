import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import styled from "styled-components";

import classNames from "classnames";

import { Button } from "../../subComponents/buttons";
import { Input } from "../../subComponents/input";
import { InputNotification, TextFieldLabel } from "../../subComponents/typography";

const Wrapper = styled.div``;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ConfirmationInput = styled(Input)`
  margin-right: 8px;
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
  public render(): JSX.Element {
    const { title, notification } = this.props;
    const { checked } = this.state;
    return (
      <Wrapper>
        <TextFieldLabel>{title}</TextFieldLabel>
        <ContentWrapper>
          <ConfirmationInput className={classNames("confirm", { checked })} {...this.props} disabled />
          <CopyToClipboard text={this.props.value} onCopy={this.copied}>
            <Button large title="Copy!" type="primary" icon="check" checked={checked} />
          </CopyToClipboard>
        </ContentWrapper>
        {checked && <InputNotification className="confirm">{notification}</InputNotification>}
      </Wrapper>
    );
  }
}
