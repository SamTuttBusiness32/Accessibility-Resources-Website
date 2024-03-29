import React from 'react';
import styled, { css } from 'styled-components';
import {
  brandColours,
  breakpointSizes,
  fluidFontSize,
  maxBreakpointQuery,
  minBreakpointQuery,
  sectionPaddings,
  standardColours,
} from '../styles';
import { Container, Heading, HtmlContent, TextAlignment } from './ui';

const StyledImageContentCards = styled.section`
  ${sectionPaddings(`40px`, `80px`)};
  background-color: ${standardColours.white};
`;

const StyledHeader = styled.header`
  text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'center')};
`;

const StyledHeading = styled(Heading)``;

const StyledText = styled(HtmlContent)`
  margin-top: 10px;

  ${minBreakpointQuery.large`
    margin-top: 15px;
  `}
`;

const StyledItems = styled.ul`
  display: grid;
  margin-top: 30px;
  gap: 20px;

  ${minBreakpointQuery.small`
    margin-top: 40px;
  `}

  ${minBreakpointQuery.mlarge`
    gap: 30px;
  `}

  ${minBreakpointQuery.large`
    margin-top: 50px;
  `}
`;

const StyledItem = styled.li`
  display: flex;
  gap: 20px;
  align-items: center;
  border-radius: 4px;
  padding: 30px;
  background-color: ${brandColours.secondary};
  border-radius: 12px;

  ${maxBreakpointQuery.medium`
    margin: 0 auto;
    flex-direction: column;
  `}

  ${minBreakpointQuery.small`
    gap: 25px;
  `}

  ${minBreakpointQuery.large`
    gap: 30px;
  `}
`;

const StyledImages = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 10px;
  column-gap: 20px;
  justify-items: center;
  width: 170px;
  flex-shrink: 0;
`;

const StyledImageWrapper = styled.div`
  display: flex;
  ${({ index }) => {
    if (index === 0) {
      return css`
        grid-area: 1/1/1/3;
      `;
    }
  }}
`;

const StyledImage = styled.img`
  width: 75px;
`;

const StyledItemHeading = styled.h3`
  ${({ theme }) =>
    fluidFontSize(
      22,
      32,
      breakpointSizes.tiny,
      breakpointSizes.xxxxlarge,
      theme.fontSizeMultiplier,
    )};
  text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'center')};
`;

const StyledContent = styled(HtmlContent)`
  margin-top: 10px;

  ${minBreakpointQuery.small`
    margin-top: 15px;
  `}
`;

const ImageContentCards = ({ heading, items, text, incrementImages }) => (
  <StyledImageContentCards>
    <Container>
      <StyledHeader>
        <StyledHeading>{heading}</StyledHeading>
        <StyledText content={text} />
      </StyledHeader>
      <StyledItems>
        {items.map(({ heading, content }, id) => (
          <StyledItem key={id}>
            <StyledImages>
              {items.slice(0, id + 1).map(({ image }, index) => (
                <StyledImageWrapper key={index} index={index}>
                  <StyledImage src={image.url} alt={image.alt} />
                </StyledImageWrapper>
              ))}
            </StyledImages>
            <div>
              <StyledItemHeading>{heading}</StyledItemHeading>
              <StyledContent content={content} />
            </div>
          </StyledItem>
        ))}
      </StyledItems>
    </Container>
  </StyledImageContentCards>
);

export default ImageContentCards;
