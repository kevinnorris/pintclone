import React from 'react';

import A from 'components/A';
// import styled from 'styled-components';
import Wrapper from './Wrapper';

function Footer() {
  return (
    <Wrapper>
      <section>
        <A href="https://github.com/kevinnorris/pintclone" target="blank" rel="noopener noreferrer">Github Repo</A>
      </section>
    </Wrapper>
  );
}

Footer.propTypes = {

};

export default Footer;
