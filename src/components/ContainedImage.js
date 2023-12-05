import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { sectionMargins } from '../styles';
import { Container } from './ui';

const StyledContainedImage = styled.section`
  ${sectionMargins()};
`;

const ContainedImage = ({ image: { gatsbyImageData, alt } }) => (
  <StyledContainedImage>
    <Container>
      <GatsbyImage image={gatsbyImageData} alt={alt} />
    </Container>
  </StyledContainedImage>
);

export default ContainedImage;
