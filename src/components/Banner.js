import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import {
  brandColours,
  breakpointSizes,
  fluidFontSize,
  minBreakpointQuery,
  sectionPaddings,
  standardColours,
} from '../styles';
import { Container, HtmlContent } from './ui';

const StyledBanner = styled.section`
  background-color: ${brandColours.primary};
  color: ${standardColours.white};
  display: grid;
  align-items: center;
  justify-items: center;
`;

const StyledOuter = styled.div`
  grid-area: 1/1/1/1;
  z-index: 2;
`;

const StyledContent = styled.div`
  text-align: center;
  padding: 30px 0;
`;

const StyledHeading = styled.h1`
  ${fluidFontSize(
    '30px',
    '50px',
    breakpointSizes.tiny,
    breakpointSizes.xxxxlarge,
  )};
  line-height: 1.2;
`;

const StyledText = styled(HtmlContent)`
  margin-top: 18px;

  ${minBreakpointQuery.small`
    margin-top: 22px;
  `}

  ${minBreakpointQuery.large`
    margin-top: 26px;
  `}
`;

const StyledImage = styled(GatsbyImage)`
  grid-area: 1/1/1/1;
  width: 100%;
  height: 100%;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${standardColours.transparentBlack(0.5)};
    z-index: 1;
  }

  ${minBreakpointQuery.large`
    max-height: 580px;
  `}
`;

const Banner = ({ heading, text, image }) => (
  <StyledBanner>
    <StyledOuter>
      {console.log(image)}
      <Container>
        <StyledContent>
          <StyledHeading>{heading}</StyledHeading>
          <StyledText content={text} />
        </StyledContent>
      </Container>
    </StyledOuter>
    <StyledImage
      image={image.gatsbyImageData}
      alt={image.alt}
      loading="eager"
    />
  </StyledBanner>
);

export default Banner;
