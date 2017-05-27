import styled from 'styled-components';
import { background, helpTextColor } from 'utils/colors';

const Wrapper = styled.footer`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  color: ${helpTextColor};
  background: ${background};
  display: flex;
  justify-content: space-around;
  padding: 1em 0;
`;

export default Wrapper;
