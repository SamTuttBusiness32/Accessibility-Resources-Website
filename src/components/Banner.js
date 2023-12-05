import React from 'react';
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
  ${sectionPaddings('30px', '80px')};
  background-color: ${brandColours.primary};
  color: ${standardColours.white};
`;

const StyledInner = styled.div`
  display: grid;
  gap: 40px;

  ${minBreakpointQuery.small`
    gap: 60px;
  `}

  ${minBreakpointQuery.medium`
    grid-template-columns: 1.2fr 1fr;
    align-items: center;
  `}

  ${minBreakpointQuery.mlarge`
    
    grid-template-columns: repeat(2, 1fr);
  `}

  ${minBreakpointQuery.large`
    gap: 80px;
  `}

  ${minBreakpointQuery.xxlarge`
    gap: 100px;
  `}
`;

const StyledContent = styled.div``;

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

const StyledImageWrapper = styled.div`
  display: grid;
`;

const StyledImage = styled.img`
  grid-area: 1/1/1/1;
  width: 100%;
  max-height: 320px;

  ${minBreakpointQuery.tiny`
    max-height: 360px;
  `}

  ${minBreakpointQuery.small`
    max-height: 400px;
  `}

  ${minBreakpointQuery.large`
    max-height: 440px;
  `}

  ${minBreakpointQuery.xxlarge`
    max-height: 480px;
  `}
`;

const Banner = ({ heading, text, image }) => (
  <StyledBanner>
    <Container>
      <StyledInner>
        <StyledContent>
          <StyledHeading>{heading}</StyledHeading>
          <StyledText content={text} />
        </StyledContent>
        <StyledImageWrapper>
          <StyledImage src={image.url} alt={image.alt} loading="eager" />
        </StyledImageWrapper>
      </StyledInner>
    </Container>
  </StyledBanner>
);

export default Banner;
