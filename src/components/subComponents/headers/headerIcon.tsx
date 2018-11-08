import styled from "styled-components";

import { get } from "lodash";

import LoadingIcon from "../../../../resources/loading.svg";
import BellIcon from "../../../../resources/bell.svg";

interface HeaderIconProps {
  readonly icon: string;
}

const icons = {
  loading: LoadingIcon,
  bell: BellIcon,
};

export const HeaderIcon = styled.div.attrs<HeaderIconProps>({})`
  display: inline-block;
  width: 17px;
  height: 20px;
  transition: background-color 0.5s;
  &.active,
  &:hover {
    background-color: #31e6c9;
  }
  background-color: #dbdde4;
  mask: url(${props => get(icons, props.icon)}) no-repeat center;
`;
