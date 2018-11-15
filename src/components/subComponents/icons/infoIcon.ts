import styled from "styled-components";

import InfoHighlight from "../../../../resources/info_active.svg";
import InfoNormal from "../../../../resources/info_normal.svg";

export const InfoIcon = styled.div`
  width: 17px;
  height: 17px;
  background-image: url(${InfoNormal});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  &:hover {
    background-image: url(${InfoHighlight});
  }
`;
