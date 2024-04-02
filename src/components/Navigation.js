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
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: ${brandColours.tertiary};
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
    )}, ${standardTransition(
      'border-color',
      theme.animationDelayValue,
    )}, ${standardTransition('background-color', theme.animationDelayValue)}`};
  padding-bottom: 4px;
  border-bottom: solid 3px ${standardColours.transparent};

  ${maxBreakpointQuery.mlarge`
    padding: 10px 30px;
    color: ${standardColours.white};
    border-top: solid 3px ${standardColours.transparent};

    img{
      filter: brightness(0) invert(1);
    }
  `}

  &:hover,
  &.current-page {
    ${minBreakpointQuery.mlarge`
      border-color: ${brandColours.primary};
    `}

    ${maxBreakpointQuery.mlarge`
      background-color: ${brandColours.primary};
      color: ${standardColours.white};
      border-color: ${standardColours.white};
    `}
  }
`;

const Navigation = () => {
  const {
    datoCmsHeader: { navigation },
    datoCmsLogin,
    datoCmsProfile,
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
      datoCmsLogin {
        title
        icon {
          url
          alt
        }
        slug
      }
      datoCmsProfile {
        title
        icon {
          url
          alt
        }
        slug
      }
    }
  `);

  const [displayNav, setDisplayNav] = useState(false);

  const userData = JSON.parse(localStorage.getItem('userData'));

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
            <StyledLink
              to={pageUrl}
              icon={pageUrl.icon}
              activeClassName="current-page"
            >
              {text}
            </StyledLink>
          </StyledItem>
        ))}
        <StyledItem>
          <StyledLink
            to={userData ? datoCmsProfile.slug : datoCmsLogin.slug}
            icon={userData ? datoCmsProfile.icon : datoCmsLogin.icon}
            activeClassName="current-page"
          >
            {userData ? datoCmsProfile.title : datoCmsLogin.title}
          </StyledLink>
        </StyledItem>
      </StyledList>
    </StyledNavigation>
  );
};

export default Navigation;
