import React from 'react';
import styled from 'styled-components';

import HeaderButton from 'components/HeaderButton';
import { background, fontFamily } from 'utils/colors';
import Logo from 'components/Logo';
import HeaderButtonSmall from 'components/HeaderButtonSmall';
import AddPicPopover from 'components/AddPicPopover';

const Wrapper = styled.div`
  background: ${background};
  width: 100%;
  padding: 1em 0;
  margin-bottom: 1em;
  border-bottom: 1px solid #dadada;
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

function Header({ loggedIn, logout, showModal, addPic, error, fetching }) {
  let ButtonGroup = (
    <ItemWrapper>
      <HeaderButton main onClick={showModal(true)}>Signup</HeaderButton>
      <HeaderButton onClick={showModal(false)}>Login</HeaderButton>
    </ItemWrapper>
  );
  let LogoGroup = (
    <ItemWrapper>
      <Logo to="/">
        P
      </Logo>
      <AppName>Pintclone</AppName>
    </ItemWrapper>
  );
  if (loggedIn) {
    ButtonGroup = (
      <ItemWrapper>
        <HeaderButton onClick={logout}>Logout</HeaderButton>
      </ItemWrapper>
    );
    LogoGroup = (
      <ItemWrapper>
        <Logo to="/">
          P
        </Logo>
        <HeaderButtonSmall>My Pics</HeaderButtonSmall>
        <AddPicPopover
          error={error}
          fetching={fetching}
          addPic={addPic}
        />
      </ItemWrapper>
    );
  }
  return (
    <Wrapper>
      <div className="container">
        <InnerWrapper>
          {LogoGroup}
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
  addPic: React.PropTypes.func.isRequired,
  error: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
  fetching: React.PropTypes.bool.isRequired,
};

export default Header;
