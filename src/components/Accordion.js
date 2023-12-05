import React, { useState } from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import styled, { css } from 'styled-components';
import {
  brandColours,
  fontSize,
  minBreakpointQuery,
  sectionPaddings,
  standardColours,
  visuallyHidden,
} from '../styles';
import { Container, Heading, HtmlContent } from './ui';

const StyledAccordion = styled.section`
  ${sectionPaddings()};
  background-color: ${brandColours.tertiary};
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 20px;

  ${minBreakpointQuery.small`
    margin-bottom: 30px;
  `}

  ${minBreakpointQuery.large`
    margin-bottom: 40px;
  `}
`;

const StyledItem = styled.article`
  margin: 20px 0;
  padding: 20px 30px;
  background-color: ${standardColours.white};

  ${minBreakpointQuery.small`
    padding: 25px 40px;
  `}

  ${minBreakpointQuery.large`
    padding: 30px 50px;
  `}
`;

const StyledSubHeading = styled.h3`
  position: relative;
  padding-right: 30px;
  ${fontSize(20)};
  line-height: 1.5;
  cursor: pointer;

  ${minBreakpointQuery.small`
    padding-right: 35px;
    ${fontSize(22)};
  `}

  ${minBreakpointQuery.large`
    padding-right: 40px;
    ${fontSize(24)};
  `}

  &:after {
    content: ${({ display }) => (display ? "'-'" : "'+'")};
    position: absolute;
    top: 50%;
    right: 0;
    color: ${brandColours.primary};
    ${fontSize(30)};
    transform: translateY(-50%);

    ${minBreakpointQuery.small`
      ${fontSize(35)};
    `}

    ${minBreakpointQuery.large`
      ${fontSize(40)};
    `}
  }
`;

const StyledContent = styled(HtmlContent)`
  margin-top: 20px;

  ${minBreakpointQuery.small`
    margin-top: 25px;
  `}

  ${minBreakpointQuery.large`
    margin-top: 30px;
  `}

  ${({ display }) => {
    if (!display) {
      return css`
        ${visuallyHidden()};
      `;
    }
  }}
`;

const Accordion = ({ heading, items, isFaqs }) => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <>
      {isFaqs && (
        <HelmetDatoCms
          script={[
            {
              type: 'application/ld+json',
              innerHTML: `{
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  ${items.map(({ heading, content }) =>
                    JSON.stringify({
                      '@type': 'Question',
                      name: heading,
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: content,
                      },
                    })
                  )}
                ]
              }`,
            },
          ]}
        />
      )}
      <StyledAccordion>
        <Container>
          <StyledHeading>{heading}</StyledHeading>
          {items.map(({ heading, content }, i) => {
            const display = activeItem === i;

            return (
              <StyledItem key={i}>
                <StyledSubHeading
                  display={display}
                  onClick={() => setActiveItem(display ? undefined : i)}
                >
                  {heading}
                </StyledSubHeading>
                <StyledContent content={content} display={display} />
              </StyledItem>
            );
          })}
        </Container>
      </StyledAccordion>
    </>
  );
};

export default Accordion;
