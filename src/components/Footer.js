import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  background-color: #f8f9fa;
  border-top :1px solid #9b86c2;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 550;
  text-align: center;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center;

  a {
    text-decoration: none;
    color: black;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>Designed by Tawfik</p>
      <Nav>
        <a href="https://iamtawfy.netlify.app">Contact</a>
      </Nav>
    </FooterContainer>
  );
};

export default Footer;
