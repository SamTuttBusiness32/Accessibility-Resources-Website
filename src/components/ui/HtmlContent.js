import React from 'react';
import styled from 'styled-components';
import {
  brandColours,
  fontSize,
  headingStyles,
  minBreakpointQuery,
  standardTransition,
} from '../../styles';
import { StructuredText } from './StructuredText';
import { hasStructuredText } from '../../utils';

export const StyledHtmlContent = styled.div`
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 12px;
    line-height: 1.5;

    ${minBreakpointQuery.small`
      margin-bottom: 14px;
    `}
  }

  h2 {
    ${headingStyles()};
  }

  h3 {
    ${fontSize(20)};

    ${minBreakpointQuery.small`
      ${fontSize(22)};
    `}
  }

  h4 {
    ${fontSize(19)};

    ${minBreakpointQuery.small`
      ${fontSize(20)};
    `}
  }

  h5 {
    ${fontSize(18)};

    ${minBreakpointQuery.small`
      ${fontSize(19)};
    `}
  }

  h6 {
    ${fontSize(17)};

    ${minBreakpointQuery.small`
      ${fontSize(18)};
    `}
  }

  p {
    margin-bottom: 20px;
    ${fontSize(15)};
    line-height: 1.7;

    ${minBreakpointQuery.small`
      margin-bottom: 24px;
      ${fontSize(16)};
    `}

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    position: relative;
    color: ${brandColours.primary};
    border-bottom: 1px solid transparent;
    transition: ${standardTransition('border-color')};

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
      ${fontSize(15)};
      line-height: 1.7;

      ${minBreakpointQuery.small`
        margin-bottom: 12px;
        ${fontSize(16)};
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
