import React from 'react';
import styled from 'styled-components';
import { sectionMargins } from '../styles';
import { Container, Heading, Video } from './ui';
import GuideList from './GuideList';

const StyledGuideListing = styled.section`
  ${sectionMargins()};
`;

const StyledHeading = styled(Heading)``;

const GuideListing = ({ heading, items }) => (
  <StyledGuideListing>
    <Container narrow={true}>
      <StyledHeading>{heading}</StyledHeading>
      <GuideList items={items} />
    </Container>
  </StyledGuideListing>
);

export default GuideListing;
