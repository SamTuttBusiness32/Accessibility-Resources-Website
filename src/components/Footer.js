import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { brandColours, standardColours } from '../styles';
import { Container } from './ui';

const StyledFooter = styled.footer`
  text-align: center;
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
      <Container wide={true}>
        <StyledInner>
          <p>
            &copy; {new Date().getFullYear()} {siteName}
          </p>
          <p>Website by Sam Tutt</p>
        </StyledInner>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
