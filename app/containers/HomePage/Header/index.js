import React from 'react';
import styled from 'styled-components';

import HeaderButton from 'components/HeaderButton';
import { background, fontFamily } from 'utils/colors';
import Logo from 'components/Logo';

const Wrapper = styled.div`
  background: ${background};
  width: 100%;
  padding: 1em 0;
  margin-bottom: 1em;
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AppName = styled.p`
  margin: 0 0 0 10px;
  font-size: 18px;
  font-weight: bold;
  font-family: ${fontFamily};
`;

function Header({ loggedIn, logout, showModal }) {
  let ButtonGroup = (
    <ItemWrapper>
      <HeaderButton main onClick={showModal(true)}>Signup</HeaderButton>
      <HeaderButton onClick={showModal(false)}>Login</HeaderButton>
    </ItemWrapper>
  );
  if (loggedIn) {
    ButtonGroup = (
      <ItemWrapper>
        <HeaderButton onClick={logout}>Logout</HeaderButton>
      </ItemWrapper>
    );
  }
  return (
    <Wrapper>
      <div className="container">
        <InnerWrapper>
          <ItemWrapper>
            <Logo to="/">
              P
            </Logo>
            <AppName>Pintclone</AppName>
          </ItemWrapper>
          {ButtonGroup}
        </InnerWrapper>
      </div>
    </Wrapper>
  );
}

Header.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  logout: React.PropTypes.func.isRequired,
  showModal: React.PropTypes.func.isRequired,
};

export default Header;
