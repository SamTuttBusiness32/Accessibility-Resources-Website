import React from 'react';
import styled from 'styled-components';
import { minBreakpointQuery, standardColours, zIndexLayers } from '../styles';
import { Container } from './ui';
import Logo from './Logo';
import Navigation from './Navigation';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${standardColours.lightGrey};
  z-index: ${zIndexLayers.fifth};
`;

const StyledInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  height: 90px;

  ${minBreakpointQuery.mlarge`
    height: 80px;
  `}
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
