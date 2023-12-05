import { css } from 'styled-components';

export const visuallyHidden = () => {
  return css`
    position: absolute;
    overflow: hidden;
    margin: -1px;
    padding: 0;
    height: 1px;
    width: 1px;
    border: 0;
    clip: rect(0 0 0 0);
  `;
};
