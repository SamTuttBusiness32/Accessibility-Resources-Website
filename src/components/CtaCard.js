import React from 'react';
import styled from 'styled-components';
import {
  brandColours,
  fontSize,
  minBreakpointQuery,
  sectionMargins,
  standardColours,
} from '../styles';
import { Button, Container, Heading, HtmlContent } from './ui';

const StyledCtaCard = styled.article`
  border-radius: 15px;
  overflow: hidden;
  background-color: ${standardColours.lightGrey};
  color: ${brandColours.primary};
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const StyledImageWrapper = styled.div`
  padding: 20px;
  background-color: ${({ rank }) =>
    rank === 1 ? '#B3D9D9' : rank === 2 ? '#66B3B3' : '#008080'};
  max-height: 250px;
  height: 100%;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledContent = styled.div`
  padding: 20px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  height: 100%;
`;

const StyledHeading = styled.h3`
  ${minBreakpointQuery.small`
    ${fontSize(18)};
  `}

  ${minBreakpointQuery.large`
    ${fontSize(20)};
  `}
`;

const StyledButton = styled(Button)`
  margin-top: auto;
`;

const CtaCard = ctaCard => {
  const { image, heading, text, link, rank, ...props } = ctaCard;
  return (
    <StyledCtaCard {...props}>
      <StyledImageWrapper rank={rank}>
        <StyledImage src={image.url} alt={image.alt} />
      </StyledImageWrapper>
      <StyledContent>
        <StyledHeading>{heading}</StyledHeading>
        <HtmlContent content={text} />
        <StyledButton to={link.pageUrl}>{link.text}</StyledButton>
      </StyledContent>
    </StyledCtaCard>
  );
};

export default CtaCard;
