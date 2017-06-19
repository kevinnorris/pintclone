import { PropTypes } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import { nonMainBtnBackground, nonMainBtnColor, nonMainHighlight, main, mainColor, mainHighlight } from 'utils/colors';


const StyledLink = styled(Link)`
  background: ${(props) => props.main ? main : nonMainBtnBackground};
  color: ${(props) => props.main ? mainColor : nonMainBtnColor};
  width: ${(props) => props.small ? '96px' : '128px'};
  padding: ${(props) => props.small ? '6px 12px' : '10px 12px'};
  margin: 0 5px;
  -webkit-font-smoothing: antialiased;
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
    padding: 5px 12px;
  }
`;

StyledLink.propTypes = {
  main: PropTypes.bool,
  small: PropTypes.bool,
};

export default StyledLink;
