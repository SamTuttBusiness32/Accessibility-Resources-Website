import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled, { css } from 'styled-components';
import {
  brandColours,
  maxBreakpointQuery,
  minBreakpointQuery,
  sectionMargins,
  standardColours,
} from '../styles';
import { Button, Container, Heading, HtmlContent, TextAlignment } from './ui';

const StyledImageContent = styled.section`
  ${({ version }) => {
    if (version === 2) {
      return css`
        background-color: ${brandColours.primary};
        color: ${standardColours.white};
      `;
    } else {
      return css`
        color: ${brandColours.primary};
        ${sectionMargins('40px', '80px')}
      `;
    }
  }}
  text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'left')};
`;

const StyledInner = styled.div`
  display: grid;
  gap: 30px;
  color: ${brandColours.primary};

  ${minBreakpointQuery.smedium`
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    gap: 40px;
  `}

  ${minBreakpointQuery.medium`
    gap: 60px;
  `}

  ${minBreakpointQuery.large`
    gap: 80px;
  `}

  ${minBreakpointQuery.xxlarge`
    gap: 100px;
  `}
`;

const StyledImage = styled(GatsbyImage)`
  ${maxBreakpointQuery.smedium`
    aspect-ratio: 2/1;

    @supports not (aspect-ratio: 3/2) {
      max-height: 430px;
    }
  `}

  ${maxBreakpointQuery.small`
    aspect-ratio: 3/2;
  `}

  ${maxBreakpointQuery.tsmall`
    aspect-ratio: 4/3;
  `}

  ${minBreakpointQuery.smedium`
    height: 100%;
  `}

  ${({ flip }) => {
    if (flip) {
      return css`
        ${minBreakpointQuery.smedium`
          grid-row: 1;
          grid-column: 2;
        `}
      `;
    }
  }}

  ${({ version }) => {
    if (version === 2) {
      return css`
        ${({ flip }) => (flip ? 'margin-right: -30px;' : 'margin-left: -30px;')}

        ${maxBreakpointQuery.smedium`
          ${({ flip }) =>
            flip ? 'margin-left: -30px;' : 'margin-right: -30px;'}
        `}
      `;
    } else {
      return `
        border-radius: 15px;
      `;
    }
  }}
`;

const StyledContent = styled.div`
  ${maxBreakpointQuery.smedium`
   padding-bottom: 30px;
  `}

  ${minBreakpointQuery.smedium`
    margin-top: 30px;
    margin-bottom: 30px;
  `}

  ${({ version }) => {
    if (version === 2) {
      return css`
        ${minBreakpointQuery.smedium`
          ${({ flip }) => (flip ? 'margin-left: auto;' : 'margin-right: auto;')}
          max-width: 520px;
        `}
      `;
    }
  }}
`;

const StyledHeading = styled(Heading)`
  ${({ version }) => {
    if (version === 2) {
      return css`
        color: ${standardColours.white};
      `;
    } else {
      return `
        color: ${brandColours.primary};
      `;
    }
  }}
`;

const StyledText = styled(HtmlContent)`
  margin-top: 20px;

  ${minBreakpointQuery.small`
    margin-top: 25px;
  `}

  ${minBreakpointQuery.large`
    margin-top: 30px;
  `}
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
  border-radius: 0;

  ${minBreakpointQuery.small`
    margin-top: 25px;
  `}

  ${minBreakpointQuery.large`
    margin-top: 30px;
  `}
`;

const ImageContent = ({ image, heading, text, link, flip, version }) => (
  <StyledImageContent version={version}>
    <Container wide={version === 2}>
      <StyledInner>
        <StyledImage
          image={image.gatsbyImageData}
          alt={image.alt}
          flip={flip}
          version={version}
        />
        <StyledContent flip={flip} version={version}>
          <StyledHeading version={version}>{heading}</StyledHeading>
          <StyledText content={text} />
          {link && <StyledButton to={link.pageUrl}>{link.text}</StyledButton>}
        </StyledContent>
      </StyledInner>
    </Container>
  </StyledImageContent>
);

export default ImageContent;
