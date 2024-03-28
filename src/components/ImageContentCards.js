import React from 'react';
import styled, { css } from 'styled-components';
import {
  brandColours,
  breakpointSizes,
  fluidFontSize,
  fontSize,
  fontWeights,
  maxBreakpointQuery,
  minBreakpointQuery,
  sectionMargins,
  sectionPaddings,
  standardColours,
} from '../styles';
import {
  Container,
  FontWeight,
  Heading,
  HtmlContent,
  LineHeight,
  TextAlignment,
} from './ui';

const StyledImageContentCards = styled.section`
  text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'center')};
  ${sectionPaddings(`40px`, `80px`)};
  background-color: ${standardColours.white};
`;

const StyledHeading = styled(Heading)``;

const StyledText = styled(HtmlContent)`
  margin-top: 10px;

  ${minBreakpointQuery.medium`
    text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'center')};
  `}

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

  ${minBreakpointQuery.medium`
    grid-template-columns: repeat(3, 1fr);
  `}

  ${minBreakpointQuery.mlarge`
    gap: 30px;
  `}

  ${minBreakpointQuery.large`
    margin-top: 50px;
  `}

  ${minBreakpointQuery.xlarge`
    gap: 40px;
  `}
`;

const StyledItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  ${maxBreakpointQuery.medium`
    margin: 0 auto;
  `}

  ${minBreakpointQuery.small`
    gap: 25px;
  `}

  ${minBreakpointQuery.large`
    gap: 30px;
  `}
`;

const StyledImages = styled.div`
  display: flex;
  width: 100%;
`;

const StyledImage = styled.img`
  width: 100%;
`;

const ImageContentCards = ({ heading, items, text, incrementImages }) => (
  <StyledImageContentCards>
    <Container>
      <StyledHeading>{heading}</StyledHeading>
      <StyledText content={text} />
      <StyledItems>
        {items.map(({ heading, content }, id) => (
          <StyledItem key={id}>
            <h3>{heading}</h3>
            <StyledImages>
              {items.slice(0, id + 1).map(({ image }, index) => (
                <StyledImage key={index} src={image.url} alt={image.alt} />
              ))}
            </StyledImages>
          </StyledItem>
        ))}
      </StyledItems>
    </Container>
  </StyledImageContentCards>
);

export default ImageContentCards;
