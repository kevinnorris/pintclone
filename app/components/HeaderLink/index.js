import styled from 'styled-components';
import { Link } from 'react-router';
import { main, mainColor, mainHighlight, nonMainBtnBackground, nonMainBtnColor, nonMainHighlight } from 'utils/colors';

const HeaderLink = styled(Link)`
  background: ${(props) => props.main ? main : nonMainBtnBackground};
  color: ${(props) => props.main ? mainColor : nonMainBtnColor};
  width: 96px;
  height: 30px;
  padding: 6px 12px;
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
`;

export default HeaderLink;
