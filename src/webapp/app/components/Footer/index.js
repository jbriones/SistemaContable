import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  padding: 20px;
`;

function Footer() {
  const anio = new Date().getFullYear();
  return (
    <FooterContainer>
      <strong>BCI {anio}</strong>
    </FooterContainer>
  );
}

Footer.propTypes = {

};

export default Footer;
