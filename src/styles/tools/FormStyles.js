import { css } from 'styled-components';
import {
  brandColours,
  fontSize,
  minBreakpointQuery,
  standardColours,
} from '../../styles';

export const commonFormElementStyles = () => {
  return css`
    width: 100%;
    ${({ theme }) => fontSize(14, theme.fontSizeMultiplier)};
    border: none;
    border-radius: 10px;
    padding: 13px 20px;
    margin-top: 10px;

    ${minBreakpointQuery.small`
      ${({ theme }) => fontSize(16, theme.fontSizeMultiplier)};
    `}
  `;
};

export const labelStyles = () => {
  return css`
    ${({ theme }) => fontSize(14, theme.fontSizeMultiplier)};
    display: block;

    ${minBreakpointQuery.small`
      ${({ theme }) => fontSize(16, theme.fontSizeMultiplier)};
    `}
  `;
};

export const inputStyles = () => {
  return css`
    ${commonFormElementStyles()};
    background-color: ${standardColours.white};

    &:focus {
      outline-color: ${brandColours.secondary};
    }
  `;
};

export const buttonStyles = () => {
  return css`
    ${({ theme }) => fontSize(14, theme.fontSizeMultiplier)};
    padding-left: 50px;
    padding-right: 50px;

    ${minBreakpointQuery.small`
      ${({ theme }) => fontSize(16, theme.fontSizeMultiplier)};
      padding-left: 60px;
      padding-right: 60px;
    `}

    ${minBreakpointQuery.medium`
      padding-left: 70px;
      padding-right: 70px;
    `}

    ${minBreakpointQuery.large`
      padding-left: 80px;
      padding-right: 80px;
    `}
  `;
};
