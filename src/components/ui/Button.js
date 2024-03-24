import React from 'react';
import styled, { css } from 'styled-components';
import {
  brandColours,
  fontSize,
  standardColours,
  standardTransition,
} from '../../styles';
import { Link } from './Link';

const commonButtonStyles = () => {
  return css`
    display: inline-block;
    padding: 12px 20px;
    color: ${standardColours.white};
    background-color: ${brandColours.primary};
    ${fontSize(16)};
    line-height: 1.5;
    text-align: center;
    transition: ${standardTransition('background-color')};
    border-radius: 5px;

    &:hover {
      background-color: ${brandColours.primary};
    }
  `;
};

const StyledButton = styled.button`
  ${commonButtonStyles()};
  border: none;
`;

const StyledButtonLink = styled(Link)`
  ${commonButtonStyles()};
`;

export const Button = ({ children, ...props }) => {
  const ButtonComponent = props.to ? StyledButtonLink : StyledButton;

  return <ButtonComponent {...props}>{children}</ButtonComponent>;
};
