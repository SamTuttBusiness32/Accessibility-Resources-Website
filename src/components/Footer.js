import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;
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
      <p>
        &copy; {new Date().getFullYear()} {siteName}
      </p>
    </StyledFooter>
  );
};

export default Footer;
