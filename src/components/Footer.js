import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { brandColours, standardColours } from '../styles';
import { Container, TextAlignment } from './ui';

const StyledFooter = styled.footer`
  text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'center')};
  background-color: ${brandColours.primary};
  color: ${standardColours.white};
  padding: 15px 0;
`;

const StyledInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Footer = () => {
  const {
    datoCmsSite: {
      globalSeo: { siteName },
    },
  } = useStaticQuery(graphql`
    query FooterQuery {
      datoCmsSite {
        globalSeo {
          siteName
        }
      }
    }
  `);

  return (
    <StyledFooter>
      <Container>
        <StyledInner>
          <p>{siteName}</p>
          <p>Website by Sam Tutt</p>
        </StyledInner>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
