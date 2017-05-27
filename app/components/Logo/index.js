import styled from 'styled-components';
import { Link } from 'react-router';
import { main } from 'utils/colors';

const Logo = styled(Link)`
  color: ${main};
  margin: 0;
  font-size: 3rem;
  font-weight: bold;
  text-decoration: none;

  &:hover, &:active, &:focus{
    text-decoration: none;
    color: ${main};
  }
`;

export default Logo;
