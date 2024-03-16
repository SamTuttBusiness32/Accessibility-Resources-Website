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
    ${fontSize(14)};
    border: none;
    border-radius: 10px;
    padding: 13px 20px;
    margin-top: 10px;

    ${minBreakpointQuery.small`
      ${fontSize(16)}
    `}
  `;
};

export const labelStyles = () => {
  return css`
    ${fontSize(14)};
    display: block;

    ${minBreakpointQuery.small`
      ${fontSize(16)}
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
    ${fontSize(14)};
    padding-left: 50px;
    padding-right: 50px;

    ${minBreakpointQuery.small`
      ${fontSize(16)}
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
