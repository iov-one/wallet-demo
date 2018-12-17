import styled from "styled-components";
import { border, background, xs, md} from '~/theme/variables';

export const HeaderDropdownWrapper = styled.div`
  width: 280px;
  box-shadow: 0 10px 7px 0 rgba(237, 239, 244, 0.14);
  background-color: ${background};
  border: 1px solid ${border};
  border-radius: 0 0 ${xs} ${xs};
  padding: 0px ${md};
`;
