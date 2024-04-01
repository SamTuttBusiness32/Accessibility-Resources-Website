import React from 'react';
import styled from 'styled-components';
import GuideCard from './GuideCard';
import { minBreakpointQuery } from '../styles';

const StyledGuideList = styled.section``;

const StyledItems = styled.div`
  display: grid;
  gap: 30px;

  ${minBreakpointQuery.smedium`
    grid-template-columns: repeat(2, 1fr);  
  `}
`;

const GuideList = ({ items }) => (
  <StyledGuideList>
    <StyledItems>
      {items.map((item, id) => (
        <GuideCard key={id} {...item} />
      ))}
    </StyledItems>
  </StyledGuideList>
);

export default GuideList;
