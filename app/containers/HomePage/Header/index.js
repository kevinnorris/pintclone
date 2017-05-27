import React from 'react';
import styled from 'styled-components';

import { background, fontFamily } from 'utils/colors';
import Logo from 'components/Logo';
import Authenticate from './Authenticate';

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

// TODO: make header look nice

function Header({ error }) {
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
          <ItemWrapper>
            <Authenticate login={false} />
            <Authenticate login />
          </ItemWrapper>
        </InnerWrapper>
      </div>
    </Wrapper>
  );
}

Header.propTypes = {
  error: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
};

export default Header;
