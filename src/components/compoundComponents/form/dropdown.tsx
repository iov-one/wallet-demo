import React from "react";
import styled from "styled-components";

import classNames from "classnames";

import { DropdownMenu, DropdownOption } from "../../subComponents/dropdown";

import ChevronDownIcon from "../../../../resources/chevron-down.svg";

const TriggerButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  font-family: Muli;
  font-size: 48px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
`;

const ChevronIcon = styled.img`
  margin-left: 24px;
  width: 14.5px;
  height: 7.5px;
`;

interface ItemProps {
  readonly value: string;
  readonly label: string;
  readonly description?: string;
}

interface DropdownProps {
  readonly items: ReadonlyArray<ItemProps>;
  readonly placeholder?: string;
  readonly defaultValue?: string;
  readonly onSelect: (value: string) => any;
}

interface DropdownState {
  readonly show: boolean;
  readonly selected: string;
}

export class Dropdown extends React.Component<DropdownProps, DropdownState> {
  constructor(props: DropdownProps) {
    super(props);
    this.state = {
      show: false,
      selected: props.defaultValue || "",
    };
  }
  public state = {
    show: false,
    selected: "",
  };
  showMenu = () => {
    this.setState({
      show: true,
    });
  };
  onSelect = (val: string) => {
    this.setState({
      show: false,
      selected: val,
    });
    this.props.onSelect(val);
  };
  getSelected = () => {
    const { items, placeholder } = this.props;
    const { selected } = this.state;
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].value === selected) {
        return items[i].label;
      }
    }
    return placeholder || "Select One";
  };
  public render() {
    const { show } = this.state;
    const { items } = this.props;
    const menuClassName = classNames({ show: show });
    const label = this.getSelected();
    return (
      <Wrapper>
        <TriggerButton onClick={this.showMenu}>
          {label}
          <ChevronIcon src={ChevronDownIcon} />
        </TriggerButton>
        <DropdownMenu className={menuClassName}>
          {items.map((item, key) => (
            <DropdownOption
              className={menuClassName}
              {...item}
              onClick={this.onSelect}
              key={`dropdown_item_${key}`}
            />
          ))}
        </DropdownMenu>
      </Wrapper>
    );
  }
}
