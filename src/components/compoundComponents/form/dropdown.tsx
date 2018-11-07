import React from "react";
import styled from "styled-components";

import classNames from "classnames";

import { DropdownMenu, DropdownOption } from "../../subComponents/dropdown";

const TriggerButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
`;

const Wrapper = styled.div`
  position: relative;
`;

interface ItemProps {
  readonly value: string;
  readonly label: string;
  readonly description?: string;
}

interface DropdownProps {
  readonly items: ReadonlyArray<ItemProps>;
  readonly trigger: JSX.Element;
  readonly onSelect: (value: string) => any;
}

interface DropdownState {
  readonly show: boolean;
}

export class Dropdown extends React.Component<DropdownProps, DropdownState> {
  constructor(props: DropdownProps) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  private wrapperRef = React.createRef<HTMLDivElement>();
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  state = {
    show: false,
  };
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  handleClickOutside(event: any) {
    const node = this.wrapperRef.current;
    if (node && !node.contains(event.target)) {
      this.setState({
        show: false,
      });
    }
  }
  showMenu = () => {
    this.setState({
      show: true,
    });
  };
  onSelect = (val: string) => {
    this.setState({
      show: false,
    });
    this.props.onSelect(val);
  };
  public render() {
    const { show } = this.state;
    const { trigger, items } = this.props;
    const menuClassName = classNames({ show: show });
    return (
      <Wrapper ref={this.wrapperRef as any}>
        <TriggerButton onClick={this.showMenu}>{trigger}</TriggerButton>
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
