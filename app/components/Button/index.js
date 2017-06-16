/**
*
* Button
*
* If passed a rout via a "to" property it will render a link to a react-router route
* Otherwise it will render a button with an onclick
*
* If passed "main" it will render with main color scheme
* If passed "small" it will have smaller dimentions
*/

import React, { PropTypes, Children } from 'react';

import StyledButton from './StyledButton';
import StyledLink from './StyledLink';

function Button({ children, to, onClick, main, small }) {
  let btn = (
    <StyledButton onClick={onClick} main={main} small={small}>
      {Children.toArray(children)}
    </StyledButton>
  );
  if (to) {
    btn = (
      <StyledLink to={to} main={main} small={small}>
        {Children.toArray(children)}
      </StyledLink>
    );
  }

  return (
    btn
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  main: PropTypes.bool,
  small: PropTypes.bool,
};

export default Button;
