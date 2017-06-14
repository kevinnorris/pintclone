import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { main, mainColor, mainHighlight, nonMainBtnBackground, nonMainBtnColor, nonMainHighlight } from 'utils/colors';

const HeaderButton = styled(Button)`
  background: ${(props) => props.main ? main : nonMainBtnBackground};
  color: ${(props) => props.main ? mainColor : nonMainBtnColor};
  width: 128px;
  height: 40px;
  margin: 0 5px;
  text-align: center;
  font-weight: bold;
  border: none;
  border-radius: 4px;

  &:hover, &:active, &:focus{
    background: ${(props) => props.main ? mainHighlight : nonMainHighlight};
    color: ${(props) => props.main ? mainColor : nonMainBtnColor};
    text-decoration: none;
  }

  @media (max-width: 460px) {
    width: 90px;
    height: 30px;
  }
`;

export default HeaderButton;
