import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import {
  brandColours,
  maxBreakpointQuery,
  minBreakpointQuery,
  standardColours,
  standardTransition,
  zIndexLayers,
} from '../styles';
import { Link } from './ui';

const StyledNavigation = styled.nav``;

const StyledToggle = styled.button`
  ${maxBreakpointQuery.mlarge`
    position: relative;
    margin: 0;
    padding: 8px 0;
    height: 100%;
    background-color: ${brandColours.tertiary};
    border: none;
  `}

  ${minBreakpointQuery.mlarge`
    display: none;
  `}

  span {
    ${maxBreakpointQuery.mlarge`
      display: block;
      height: 3px;
      width: 24px;
      margin: 6px 18px;
      background-color: ${brandColours.secondary};
    `}
  }
`;

const StyledList = styled.ul`
  ${maxBreakpointQuery.mlarge`
    position: absolute;
    top: 90px;
    right: 0;
    left: 0;
    z-index: ${zIndexLayers.fourth};
    display: ${({ $displayNav }) => ($displayNav ? 'block' : 'none')};
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: ${brandColours.secondary};
  `}
`;

const StyledItem = styled.li`
  ${maxBreakpointQuery.mlarge`
    margin-top: 10px;
  `}

  ${minBreakpointQuery.mlarge`
    display: inline-block;
    margin-left: 20px;
  `}

  &:first-child {
    ${maxBreakpointQuery.mlarge`
      margin-top: 0;
    `}

    ${minBreakpointQuery.mlarge`
      margin-left: 0;
    `}
  }
`;

const StyledLink = styled(Link)`
  transition: ${({ theme }) =>
    `${standardTransition(
      'color',
      theme.animationDelayValue,
    )}, ${standardTransition('border-color', theme.animationDelayValue)}`};

  border-bottom: solid 3px ${standardColours.transparent};

  ${maxBreakpointQuery.mlarge`
    display: block;
    padding: 10px 30px;
    color: ${standardColours.white};
  `}

  &:hover,
  &.current-page {
    color: ${brandColours.primary};
    border-color: ${brandColours.primary};
  }
`;

const Navigation = () => {
  const {
    datoCmsHeader: { navigation },
  } = useStaticQuery(graphql`
    query NavigationQuery {
      datoCmsHeader {
        navigation {
          id
          text
          pageUrl {
            ...LinkFragment
          }
        }
      }
    }
  `);

  const [displayNav, setDisplayNav] = useState(false);

  return (
    <StyledNavigation>
      <StyledToggle
        aria-label="Open / Close Navigation"
        onClick={() => setDisplayNav(!displayNav)}
      >
        <span />
        <span />
        <span />
      </StyledToggle>
      <StyledList $displayNav={displayNav}>
        {navigation.map(({ text, pageUrl }, id) => (
          <StyledItem key={id}>
            <StyledLink to={pageUrl} activeClassName="current-page">
              {text}
            </StyledLink>
          </StyledItem>
        ))}
      </StyledList>
    </StyledNavigation>
  );
};

export default Navigation;
