import React from 'react';
import styled from 'styled-components';

import { background, fontFamily } from 'utils/colors';
import Logo from 'components/Logo';
import Button from 'components/Button';
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

function Header({
  loggedIn,
  logout,
  showModal,
  error,
  fetching,
  show,
  target,
  imgUrl,
  title,
  titleChange,
  imgUrlChange,
  handelClick,
  handelSubmit,
  username,
}) {
  let ButtonGroup = (
    <ItemWrapper>
      <Button main onClick={showModal(true)}>Signup</Button>
      <Button onClick={showModal(false)}>Login</Button>
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
        <Button onClick={logout}>Logout</Button>
      </ItemWrapper>
    );
    LogoGroup = (
      <ItemWrapper>
        <Logo to="/">
          P
        </Logo>
        <Button to={`/${username}`}>My Pics</Button>
        <AddPicPopover
          error={error}
          fetching={fetching}
          show={show}
          target={target}
          imgUrl={imgUrl}
          title={title}
          titleChange={titleChange}
          imgUrlChange={imgUrlChange}
          handelClick={handelClick}
          handelSubmit={handelSubmit}
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
  error: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
  fetching: React.PropTypes.bool.isRequired,
  show: React.PropTypes.bool.isRequired,
  target: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.object]),
  imgUrl: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  titleChange: React.PropTypes.func.isRequired,
  imgUrlChange: React.PropTypes.func.isRequired,
  handelClick: React.PropTypes.func.isRequired,
  handelSubmit: React.PropTypes.func.isRequired,
  username: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
};

export default Header;
