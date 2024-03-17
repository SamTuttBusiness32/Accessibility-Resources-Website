import React from 'react';
import styled from 'styled-components';
import { standardColours } from '../styles';
import { Container } from './ui';
import Logo from './Logo';
import Navigation from './Navigation';

const StyledHeader = styled.header`
  background-color: ${standardColours.lightGrey};
`;

const StyledInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

const Header = () => (
  <StyledHeader>
    <Container wide={true}>
      <StyledInner>
        <Logo />
        <Navigation />
      </StyledInner>
    </Container>
  </StyledHeader>
);

export default Header;
