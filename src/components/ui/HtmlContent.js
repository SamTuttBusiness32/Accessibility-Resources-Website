import React from 'react';
import styled from 'styled-components';
import {
  brandColours,
  fontSize,
  fontWeights,
  headingStyles,
  minBreakpointQuery,
  standardTransition,
} from '../../styles';
import { StructuredText } from './StructuredText';
import { hasStructuredText } from '../../utils';
import { LineHeight } from './LineHeight';
import { FontWeight } from './FontWeight';

export const StyledHtmlContent = styled.div`
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 12px;
    line-height: ${({ theme }) => LineHeight(theme.lineHeightValue, 1.5)};
    font-weight: ${({ theme }) =>
      FontWeight(theme.fontWeightValue, fontWeights.bold)};

    ${minBreakpointQuery.small`
      margin-bottom: 14px;
    `}
  }

  h2 {
    ${headingStyles()};
  }

  h3 {
    ${({ theme }) => fontSize(20, theme.fontSizeMultiplier)};

    ${minBreakpointQuery.small`
      ${({ theme }) => fontSize(22, theme.fontSizeMultiplier)};
    `}
  }

  h4 {
    ${({ theme }) => fontSize(19, theme.fontSizeMultiplier)};

    ${minBreakpointQuery.small`
      ${({ theme }) => fontSize(20, theme.fontSizeMultiplier)};
    `}
  }

  h5 {
    ${({ theme }) => fontSize(18, theme.fontSizeMultiplier)};

    ${minBreakpointQuery.small`
      ${({ theme }) => fontSize(19, theme.fontSizeMultiplier)};
    `}
  }

  h6 {
    ${({ theme }) => fontSize(17, theme.fontSizeMultiplier)};

    ${minBreakpointQuery.small`
      ${({ theme }) => fontSize(18, theme.fontSizeMultiplier)};
    `}
  }

  p {
    margin-bottom: 20px;
    ${({ theme }) => fontSize(15, theme.fontSizeMultiplier)};
    line-height: ${({ theme }) => LineHeight(theme.lineHeightValue, 1.7)};

    ${minBreakpointQuery.small`
      margin-bottom: 24px;
      ${({ theme }) => fontSize(16, theme.fontSizeMultiplier)};
    `}

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    position: relative;
    color: ${brandColours.primary};
    border-bottom: 1px solid transparent;
    transition: ${({ theme }) =>
      standardTransition('border-color', theme.animationDelayValue)};

    &:hover {
      border-bottom-color: ${brandColours.primary};
    }
  }

  ul,
  ol {
    margin-bottom: 20px;

    ${minBreakpointQuery.small`
      margin-bottom: 24px;
    `}

    &:last-child {
      margin-bottom: 0;
    }

    li {
      margin-bottom: 10px;
      ${({ theme }) => fontSize(15, theme.fontSizeMultiplier)};
      line-height: ${({ theme }) => LineHeight(theme.lineHeightValue, 1.7)};

      ${minBreakpointQuery.small`
        margin-bottom: 12px;
        ${({ theme }) => fontSize(16, theme.fontSizeMultiplier)};
      `}

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  ul {
    li {
      position: relative;
      padding-left: 20px;

      &:before {
        content: '';
        position: absolute;
        top: 8px;
        left: 0;
        display: inline-block;
        height: 8px;
        width: 8px;
        background-color: ${brandColours.primary};
        border-radius: 50%;
      }
    }
  }

  ol {
    list-style-type: decimal;

    li {
      margin-left: 16px;
    }
  }

  iframe[src^="https://www.youtube"]
  {
    height: auto;
    width: 100%;
    aspect-ratio: 16 / 9;
  }
`;

export const HtmlContent = ({ content, ...props }) =>
  hasStructuredText(content) && (
    <StyledHtmlContent {...props}>
      <StructuredText data={content} />
    </StyledHtmlContent>
  );
