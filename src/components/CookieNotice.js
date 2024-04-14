import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import {
  brandColours,
  maxBreakpointQuery,
  minBreakpointQuery,
  standardColours,
  zIndexLayers,
} from '../styles';
import { Button, Container, TextAlignment } from './ui';
import { slugify } from '../utils';

const StyledCookieNotice = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 20px 0;
  width: 100%;
  background-color: ${brandColours.tertiary};
  z-index: ${zIndexLayers.fifth};
`;

const StyledInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${maxBreakpointQuery.medium`
    flex-direction: column;
  `}
`;

const StyledText = styled.p`
  text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'center')};
  color: ${standardColours.white};

  ${maxBreakpointQuery.medium`
    margin-bottom: 15px;
  `}

  ${minBreakpointQuery.medium`
    margin-right: 15px;
  `}
`;

const CookieNotice = () => {
  const {
    datoCmsSite: { name },
  } = useStaticQuery(graphql`
    query CookieNoticeQuery {
      datoCmsSite {
        name
      }
    }
  `);

  const localStorageKey = `${slugify(name)}:accept-cookie-notice`;
  const [acceptedCookie, setAcceptedCookie] = useState();

  useEffect(() => {
    setAcceptedCookie(localStorage.getItem(localStorageKey) || false);
  }, [localStorageKey]);

  const acceptCookieNotice = () => {
    setAcceptedCookie(true);
    localStorage.setItem(localStorageKey, true);
  };

  return acceptedCookie === false ? (
    <StyledCookieNotice>
      <Container>
        <StyledInner>
          <StyledText>
            We use cookies to give you the best experience on our site.
          </StyledText>
          <Button onClick={() => acceptCookieNotice()}>That's ok</Button>
        </StyledInner>
      </Container>
    </StyledCookieNotice>
  ) : (
    ''
  );
};

export default CookieNotice;
