import styled from 'styled-components';
import { btnBorderRadius, background } from 'utils/colors';

const CloseModalButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 2px 10px;
  border-radius: ${btnBorderRadius};
  color: ${background};
  background: rgba(113, 113, 113, 0.2);
  font-weight: bold;
  font-size: 2rem;

  &:hover {
    cursor: pointer;
  }
`;

export default CloseModalButton;
