import { css } from 'styled-components';
import { breakpointSizes } from '../variables';

export const minBreakpointQuery = Object.keys(breakpointSizes).reduce(
  (acc, size) => {
    acc[size] = (...args) => css`
      @media (min-width: ${breakpointSizes[size]}px) {
        ${css(...args)}
      }
    `;
    return acc;
  },
  {}
);

export const maxBreakpointQuery = Object.keys(breakpointSizes).reduce(
  (acc, size) => {
    acc[size] = (...args) => css`
      @media (max-width: ${breakpointSizes[size] - 1}px) {
        ${css(...args)}
      }
    `;
    return acc;
  },
  {}
);
