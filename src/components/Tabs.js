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
import {
  Container,
  Heading,
  HtmlContent,
  LineHeight,
  TextAlignment,
} from './ui';

const StyledTabs = styled.section`
  ${sectionMargins()};
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 20px;
  text-align: ${({ theme }) => TextAlignment(theme.alignTextValue, 'center')};

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
  line-height: ${({ theme }) => LineHeight(theme.lineHeightValue, 1.5)};
  background: none;
  border: none;
  border-bottom: 2px solid ${brandColours.tertiary};
  transition: ${({ theme }) =>
    `${standardTransition(
      'color',
      theme.animationDelayValue,
    )}, ${standardTransition('border-color', theme.animationDelayValue)}`};

  ${({ active }) => {
    if (active) {
      return css`
        color: ${brandColours.primary};
        border-bottom-color: ${brandColours.primary};
      `;
    }
  }}

  ${minBreakpointQuery.medium`
    ${({ theme }) => fontSize(18, theme.fontSizeMultiplier)};
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
  const [activeTab2Id, setActiveTab2Id] = useState(0);
  const [activeTab3Id, setActiveTab3Id] = useState(0);

  return (
    <StyledTabs>
      <Container narrow={true}>
        <StyledHeading alt={true}>{heading}</StyledHeading>
        <StyledList>
          {items.map(({ title }, id) => (
            <StyledItem key={id}>
              <StyledTab
                active={id === activeTabId}
                onClick={() => {
                  setActiveTabId(id);
                }}
              >
                {title}
              </StyledTab>
            </StyledItem>
          ))}
        </StyledList>
        {items.map(({ title, content, treeChildren }, id) => (
          <StyledContent key={id} active={id === activeTabId}>
            <StyledContentHeading>{title}</StyledContentHeading>
            <HtmlContent content={content} />
            <StyledList>
              {treeChildren.map(({ title }, id) => (
                <StyledItem key={id}>
                  <StyledTab
                    active={id === activeTab2Id}
                    onClick={() => {
                      setActiveTab2Id(id);
                    }}
                  >
                    {title}
                  </StyledTab>
                </StyledItem>
              ))}
            </StyledList>
            {treeChildren.map(({ title, content, treeChildren }, id) => (
              <StyledContent key={id} active={id === activeTab2Id}>
                <StyledContentHeading>{title}</StyledContentHeading>
                <HtmlContent content={content} />
                <StyledList>
                  {treeChildren.map(({ title }, id) => (
                    <StyledItem key={id}>
                      <StyledTab
                        active={id === activeTab3Id}
                        onClick={() => {
                          setActiveTab3Id(id);
                        }}
                      >
                        {title}
                      </StyledTab>
                    </StyledItem>
                  ))}
                </StyledList>
                {treeChildren.map(({ title, content }, id) => (
                  <StyledContent key={id} active={id === activeTab3Id}>
                    <StyledContentHeading>{title}</StyledContentHeading>
                    <HtmlContent content={content} />
                  </StyledContent>
                ))}
              </StyledContent>
            ))}
          </StyledContent>
        ))}
      </Container>
    </StyledTabs>
  );
};

export default Tabs;
