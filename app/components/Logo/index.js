import styled from 'styled-components';
import { Link } from 'react-router';
import { main } from 'utils/colors';

const Logo = styled(Link)`
  background: ${main};
  color: white;
  padding: 0 0.9rem;
  border-radius: 100%;
  margin: 0 10px 0 0;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Lobster', cursive;
  text-decoration: none;

  &:hover, &:active, &:focus{
    text-decoration: none;
    color: white;
  }
`;

export default Logo;
