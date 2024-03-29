import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import {
  brandColours,
  fontWeights,
  maxBreakpointQuery,
  minBreakpointQuery,
  sectionMargins,
  standardColours,
} from '../styles';
import {
  CardHeader,
  Container,
  Heading,
  HtmlContent,
  TextAlignment,
} from './ui';
import { graphql, useStaticQuery } from 'gatsby';

const StyledAccessibilityFunctionsGuide = styled.section`
  ${sectionMargins()};
`;

const StyledHeader = styled.header`
  text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'center')};
`;

const StyledText = styled(HtmlContent)`
  margin-top: 15px;
`;

const StyledItems = styled.ul`
  display: grid;
  gap: 30px;
  margin-top: 50px;
  max-width: 1200px;
  padding-left: 30px;
  padding-right: 30px;
  margin-left: auto;
  margin-right: auto;

  ${minBreakpointQuery.small`
    gap: 45px;
    margin-top: 60px;
  `}

  ${minBreakpointQuery.medium`
    margin-top: 70px;
  `}

  ${minBreakpointQuery.large`
    margin-top: 80px;
    gap: 60px;
  `}
`;

const StyledItem = styled.li`
  display: flex;
  gap: 30px;

  ${maxBreakpointQuery.smedium`
    flex-direction: column;
    align-items: center;
  `}

  ${minBreakpointQuery.small`
    gap: 45px;
  `}

  ${minBreakpointQuery.smedium`
    align-items: center;
    justify-content: space-between;
  `}

  ${minBreakpointQuery.large`
    gap: 60px;
  `}

  &:nth-child(even) {
    ${minBreakpointQuery.smedium`
      flex-direction: row-reverse;
    `}
  }
`;

const StyledItemInner = styled.div`
  display: grid;
  padding: 20px;
  border-radius: 5px;
  border: solid 2px ${brandColours.tertiary};
  color: ${brandColours.primary};
  background-color: ${standardColours.white};
  max-width: 300px;
  grid-row-start: 1;
  flex-shrink: 0;
`;

const StyledContent = styled(HtmlContent)`
  flex-grow: 1;
  text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'left')};
`;

const AccessibilityFunctionsGuide = ({ heading, text }) => {
  const {
    allDatoCmsAccessibilityFunction: { nodes },
  } = useStaticQuery(graphql`
    query AccessibilityFunctionsGuideQuery {
      allDatoCmsAccessibilityFunction(sort: { position: ASC }) {
        nodes {
          title
          text
          icon {
            url
            alt
          }
          content {
            value
            links {
              id: originalId
              text
              pageUrl {
                ...LinkFragment
              }
            }
          }
        }
      }
    }
  `);
  return (
    <StyledAccessibilityFunctionsGuide>
      <Container>
        <StyledHeader>
          <Heading>{heading}</Heading>
          <StyledText content={text} />
        </StyledHeader>
      </Container>
      <StyledItems>
        {nodes.map((item, id) => (
          <StyledItem>
            <StyledContent content={item.content} />
            <StyledItemInner key={id}>
              <CardHeader {...item} />
            </StyledItemInner>
          </StyledItem>
        ))}
      </StyledItems>
    </StyledAccessibilityFunctionsGuide>
  );
};

export default AccessibilityFunctionsGuide;
