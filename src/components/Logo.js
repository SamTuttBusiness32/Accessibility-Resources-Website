import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { Link } from './ui';
import logo from '../images/logo.svg';

const StyledLogo = styled(Link)`
  display: inline-block;
`;

const StyledImage = styled.img`
  max-width: 240px;
`;

const Logo = () => {
  const {
    datoCmsSite: {
      globalSeo: { siteName },
    },
  } = useStaticQuery(graphql`
    query LogoQuery {
      datoCmsSite {
        globalSeo {
          siteName
        }
      }
    }
  `);

  return (
    <StyledLogo to="/">
      <StyledImage src={logo} alt={siteName} loading="lazy" />
    </StyledLogo>
  );
};

export default Logo;
