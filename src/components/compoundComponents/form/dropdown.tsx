import React from "react";
import styled from "styled-components";

import { reduce } from "lodash";

import classNames from "classnames";

import { DropdownMenu, DropdownOption } from "../../subComponents/dropdown";

import ChevronDownIcon from "../../../../resources/dropdown_arrow.svg";

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
  padding: 0px;
`;

const NormalTriggerButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
`;

const Wrapper = styled.div`
  position: relative;
`;

const ChevronIcon = styled.img`
  margin-left: 14px;
  width: 17px;
  height: 17px;
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
  public readonly state: DropdownState;
  public readonly wrapperRef = React.createRef<HTMLElement>();
  constructor(props: DropdownProps) {
    super(props);
    this.state = {
      show: false,
      selected: props.defaultValue || "",
    };
  }
  public componentDidMount(): any {
    document.addEventListener("mousedown", this.handleClick);
  }
  public componentWillUnmount(): any {
    document.removeEventListener("mousedown", this.handleClick);
  }
  public readonly handleClick = (event: any) => {
    if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        show: false,
      });
    }
  };
  public readonly showMenu = () => {
    this.setState({
      show: true,
    });
  };
  public readonly onSelect = (val: string) => {
    this.setState({
      show: false,
      selected: val,
    });
    this.props.onSelect(val);
  };
  public readonly getSelected = () => {
    const { items, placeholder } = this.props;
    const { selected } = this.state;
    return reduce(
      items,
      (result, item) => {
        if (selected === item.value) {
          return item.label;
        }
        return result;
      },
      placeholder || "Select One",
    );
  };
  public render(): JSX.Element {
    const { show } = this.state;
    const { items } = this.props;
    const menuClassName = classNames({ show: show, withCustomTrigger: this.props.children });
    const label = this.getSelected();
    return (
      <Wrapper innerRef={this.wrapperRef}>
        {this.props.children ? (
          <NormalTriggerButton onClick={this.showMenu}>{this.props.children}</NormalTriggerButton>
        ) : (
          <TriggerButton onClick={this.showMenu}>
            {label}
            <ChevronIcon src={ChevronDownIcon} />
          </TriggerButton>
        )}
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
