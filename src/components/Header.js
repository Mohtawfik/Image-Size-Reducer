import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
  background-color: #f8f9fa;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 500;
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

  .premium-btn {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    text-decoration: none;
  }
`;

const Header = ({ onScrollToHowTo }) => {
  return (
    <HeaderContainer className="header-fixed">
      <Logo>Image Size Reducer</Logo>
      <Nav>
        <a href="#">About</a>
        <a onClick={onScrollToHowTo} href="#">How To?</a>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
