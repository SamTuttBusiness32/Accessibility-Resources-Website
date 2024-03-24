import React from 'react';
import styled from 'styled-components';
import { brandColours, fontSize } from '../../styles';

const StyledCardHeader = styled.div``;

const StyledHeader = styled.header`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StyledHeading = styled.h2`
  ${fontSize(20)};
`;

const StyledIconWraper = styled.div`
  width: 50px;
  height: 50px;
  padding: 10px;
  border: solid 1px ${brandColours.primary};
  border-radius: 50%;
  flex-shrink: 0;
`;

const StyledIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledText = styled.p`
  margin-top: 10px;
`;

export const CardHeader = cardHeader => {
  const { title, text, icon } = cardHeader;
  return (
    <StyledCardHeader>
      <StyledHeader>
        <StyledIconWraper>
          <StyledIcon src={icon.url} alt={icon.alt} />
        </StyledIconWraper>
        <StyledHeading>{title}</StyledHeading>
      </StyledHeader>
      <StyledText>{text}</StyledText>
    </StyledCardHeader>
  );
};
