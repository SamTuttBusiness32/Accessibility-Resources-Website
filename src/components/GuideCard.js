import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { HtmlContent, Link } from './ui';
import {
  brandColours,
  fontSize,
  minBreakpointQuery,
  standardColours,
  standardTransition,
} from '../styles';

//Moved up for hover
const StyledHeading = styled.h3`
  margin-bottom: 10px;
  ${({ theme }) => fontSize(18, theme.fontSizeMultiplier)};

  ${minBreakpointQuery.small`
    ${({ theme }) => fontSize(20, theme.fontSizeMultiplier)};
  `}

  ${minBreakpointQuery.medium`
    ${({ theme }) => fontSize(22, theme.fontSizeMultiplier)};
  `}

  ${minBreakpointQuery.large`
    ${({ theme }) => fontSize(24, theme.fontSizeMultiplier)};
  `}
`;

const StyledGuideCard = styled.article`
  background-color: ${standardColours.white};
  border-radius: 15px;
  overflow: hidden;
  border: solid 5px #eaf6ff;
  transition: ${standardTransition('border-color')};

  &:hover {
    border-color: ${brandColours.primary};

    ${StyledHeading} {
      text-decoration: underline;
      text-underline-offset: 7px;
    }
  }
`;

const StyledLink = styled(Link)`
  height: 100%;
`;

const StyledInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledImage = styled(GatsbyImage)`
  flex-shrink: 0;
`;

const StyledContent = styled.div`
  padding: 20px;
`;

const GuideCard = GuideCard => {
  const { title, text, image } = GuideCard;
  return (
    <StyledGuideCard>
      <StyledLink to={GuideCard}>
        <StyledInner>
          <StyledImage image={image.gatsbyImageData} alt={image.alt} />
          <StyledContent>
            <StyledHeading>{title}</StyledHeading>
            <HtmlContent content={text} />
          </StyledContent>
        </StyledInner>
      </StyledLink>
    </StyledGuideCard>
  );
};

export default GuideCard;

export const GuideCardFragment = graphql`
  fragment GuideCardFragment on DatoCmsGuide {
    title
    text {
      value
      links {
        id: originalId
        text
        pageUrl {
          ...LinkFragment
        }
      }
    }
    image {
      gatsbyImageData(
        width: 1920
        height: 580
        layout: FULL_WIDTH
        imgixParams: { fit: "crop", w: "1920", h: "580" }
      )
      alt
    }
    modularBlocks {
      ...ContentModularBlockFragment
    }
    ...LinkFragment
  }
`;
