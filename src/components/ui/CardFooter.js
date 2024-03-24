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
  transition: ${standardTransition('opacity')};
`;

const StyledItem = styled.span`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${standardColours.white};
  border: solid 1px ${standardColours.darkGrey};
  transition: ${standardTransition('background-color')},
    ${standardTransition('border-color')};

  ${({ $active }) => {
    if ($active) {
      return css`
        background-color: ${brandColours.primary};
        border-color: ${brandColours.primary};
      `;
    }
  }}
`;

export const CardFooter = CardFooter => {
  const { options, value } = CardFooter;
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
