import React from "react";
import styled, { keyframes } from "styled-components";

import { get } from "lodash";

import BellIcon from "../../../../resources/bell.svg";
import LoadingIcon from "../../../../resources/loading.svg";

interface HeaderIconProps extends React.HTMLAttributes<{}> {
  readonly icon: string;
}

const icons = {
  loading: LoadingIcon,
  bell: BellIcon,
};

const keyFrameSpin = keyframes`
    from {
        transform: rotate(0deg);
    } to {
        transform: rotate(360deg);
    }
`;

const IconImage = styled.img.attrs<HeaderIconProps>({})`
  display: inline-block;
  position: relative;
  width: ${props => (props.icon === "bell" ? "14px" : "17px")};
  height: 20px;
  transition: background-color 0.5s;
  &.active,
  &:hover path {
    fill: #31e6c9;
  }

  path {
    fill: #dbdde4;
  }

  &.spin {
    animation: ${keyFrameSpin} 5s infinite linear;
  }
`;

export const HeaderIcon = (props: HeaderIconProps): JSX.Element => (
  <IconImage {...props} src={get(icons, props.icon)} />
);
