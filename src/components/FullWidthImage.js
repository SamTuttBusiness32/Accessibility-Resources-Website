import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { sectionMargins } from '../styles';

const StyledFullWidthImage = styled.section`
  ${sectionMargins()};
`;

const FullWidthImage = ({ image: { gatsbyImageData, alt } }) => (
  <StyledFullWidthImage>
    <GatsbyImage image={gatsbyImageData} alt={alt} />
  </StyledFullWidthImage>
);

export default FullWidthImage;
