import React from 'react';
import styled from 'styled-components';
import { sectionPaddings, standardColours } from '../styles';
import { Container, Heading, HtmlContent, TextAlignment } from './ui';
import { graphql, useStaticQuery } from 'gatsby';
import AccessibilityFunctionsGuideItem from './AccessibilityFunctionsGuideItem';

const StyledAccessibilityFunctionsGuide = styled.section`
  background-color: ${standardColours.white};
`;

const StyledInner = styled.div`
  ${sectionPaddings()};
`;

const StyledHeader = styled.header`
  text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'center')};
`;

const StyledText = styled(HtmlContent)`
  margin-top: 15px;
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
        <StyledInner>
          <StyledHeader>
            <Heading>{heading}</Heading>
            <StyledText content={text} />
          </StyledHeader>
        </StyledInner>
      </Container>
      {nodes.map((item, i) => (
        <AccessibilityFunctionsGuideItem key={i} item={item} index={i} />
      ))}
    </StyledAccessibilityFunctionsGuide>
  );
};

export default AccessibilityFunctionsGuide;
