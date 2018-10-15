import styled from "styled-components";

import InfoHighlight from "../../../../resources/icons-8-info-copy@3x.png";
import InfoNormal from "../../../../resources/icons-8-info@3x.png";

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
