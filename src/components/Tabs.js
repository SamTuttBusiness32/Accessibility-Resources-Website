import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  brandColours,
  fontSize,
  minBreakpointQuery,
  sectionMargins,
  standardTransition,
  visuallyHidden,
} from '../styles';
import { Container, Heading, HtmlContent } from './ui';

const StyledTabs = styled.section`
  ${sectionMargins()};
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 20px;
  text-align: center;

  ${minBreakpointQuery.small`
    margin-bottom: 30px;
  `}

  ${minBreakpointQuery.large`
    margin-bottom: 40px;
  `}
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;

  ${minBreakpointQuery.tiny`
    flex-direction: row;
  `}
`;

const StyledItem = styled.li`
  flex-grow: 1;
`;

const StyledTab = styled.button`
  padding: 20px 10px;
  height: 100%;
  width: 100%;
  line-height: 1.5;
  background: none;
  border: none;
  border-bottom: 2px solid ${brandColours.tertiary};
  transition: ${standardTransition('color')},
    ${standardTransition('border-color')};

  ${({ active }) => {
    if (active) {
      return css`
        color: ${brandColours.primary};
        border-bottom-color: ${brandColours.primary};
      `;
    }
  }}

  ${minBreakpointQuery.medium`
    ${fontSize(18)};
  `}
`;

const StyledContent = styled.article`
  margin: 40px 0;

  ${({ active }) => {
    if (!active) {
      return css`
        ${visuallyHidden()};
      `;
    }
  }}
`;

const StyledContentHeading = styled.h3`
  ${visuallyHidden()};
`;

export const Tabs = ({ heading, items }) => {
  const [activeTabId, setActiveTabId] = useState(0);

  return (
    <StyledTabs>
      <Container narrow={true}>
        <StyledHeading alt={true}>{heading}</StyledHeading>
        <StyledList>
          {items.map(({ heading }, id) => (
            <StyledItem key={id}>
              <StyledTab
                active={id === activeTabId}
                onClick={() => {
                  setActiveTabId(id);
                }}
              >
                {heading}
              </StyledTab>
            </StyledItem>
          ))}
        </StyledList>
        {items.map(({ heading, content }, id) => (
          <StyledContent key={id} active={id === activeTabId}>
            <StyledContentHeading>{heading}</StyledContentHeading>
            <HtmlContent content={content} />
          </StyledContent>
        ))}
      </Container>
    </StyledTabs>
  );
};

export default Tabs;
