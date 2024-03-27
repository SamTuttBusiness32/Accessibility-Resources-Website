import React from 'react';
import styled, { css } from 'styled-components';
import {
  brandColours,
  standardColours,
  standardTransition,
} from '../../styles';

const StyledCardFooter = styled.footer``;

const StyledItems = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: ${({ theme }) =>
    standardTransition('opacity', theme.animationDelayValue)};
`;

const StyledItem = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${brandColours.primary};
  border: solid 1px ${standardColours.white};
  transition: ${({ theme }) =>
    `${standardTransition(
      'border-color',
      theme.animationDelayValue,
    )}, ${standardTransition('background-color', theme.animationDelayValue)}`};

  ${({ $active }) => {
    if ($active) {
      return css`
        background-color: ${standardColours.white};
        border-color: ${standardColours.white};
      `;
    }
  }}
`;

export const CardFooter = CardFooter => {
  const { options, value, ...props } = CardFooter;
  return (
    <StyledCardFooter>
      <StyledItems $active={options[0] !== value}>
        {options.map((item, id) => (
          <>{id !== 0 && <StyledItem $active={value === item}></StyledItem>}</>
        ))}
      </StyledItems>
    </StyledCardFooter>
  );
};
