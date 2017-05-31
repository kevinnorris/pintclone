import styled from 'styled-components';
import { Link } from 'react-router';
import { main } from 'utils/colors';

const Logo = styled(Link)`
  color: ${main};
  margin: 0 10px 0 0;
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Lobster', cursive;
  text-decoration: none;

  &:hover, &:active, &:focus{
    text-decoration: none;
    color: ${main};
  }
`;

export default Logo;
