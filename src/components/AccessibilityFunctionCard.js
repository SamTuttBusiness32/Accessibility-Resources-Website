import React from 'react';
import styled from 'styled-components';
import { brandColours, sectionMargins, standardColours } from '../styles';

const StyledAccessibilityFunctionCard = styled.article`
  padding: 20px;
  background-color: ${standardColours.white};
  border-radius: 5px;
`;

const StyledInner = styled.div`
  position: relative;
`;

const StyledHeader = styled.header`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const StyledHeading = styled.h2``;

const StyledIconWraper = styled.div`
  width: 50px;
  height: 50px;
  padding: 10px;
  border: solid 1px ${brandColours.primary};
  border-radius: 50%;
`;

const StyledIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledText = styled.p`
  margin-top: 10px;
`;

const AccessibilityFunctionCard = accessibilityFunctionCard => {
  const { title, text, icon, children } = accessibilityFunctionCard;
  return (
    <StyledAccessibilityFunctionCard>
      <StyledInner>
        <StyledHeader>
          <StyledIconWraper>
            <StyledIcon src={icon.url} alt={icon.alt} />
          </StyledIconWraper>
          <StyledHeading>{title}</StyledHeading>
        </StyledHeader>
        <StyledText>{text}</StyledText>
        {children}
      </StyledInner>
    </StyledAccessibilityFunctionCard>
  );
};

export default AccessibilityFunctionCard;
