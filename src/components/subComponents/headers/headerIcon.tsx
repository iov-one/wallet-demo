import React from "react";
import styled from "styled-components";

import { get } from "lodash";

import classNames from "classnames";

import LoadingIcon from "../../../../resources/loading.svg";
import BellIcon from "../../../../resources/bell.svg";

interface HeaderIconProps {
  readonly icon: string;
  readonly active?: boolean;
}

interface SubProps {
  readonly backgroundSrc: string;
}

const Icon = styled.div.attrs<SubProps>({})`
  display: inline-block;
  width: 17px;
  height: 20px;
  transition: background-color 0.5s;
  &.active,
  &:hover {
    background-color: #31e6c9;
  }
  background-color: #dbdde4;
  mask: url(${props => props.backgroundSrc}) no-repeat center;
  margin-right: 30px;
`;

const icons = {
  loading: LoadingIcon,
  bell: BellIcon,
};

export const HeaderIcon = (props: HeaderIconProps): JSX.Element => (
  <Icon className={classNames({ active: props.active })} backgroundSrc={get(icons, props.icon)} />
);
