import React from 'react';
import styled from 'styled-components';
import { sectionMargins } from '../styles';
import { Container, Video } from './ui';

const StyledExternalVideo = styled.section`
  ${sectionMargins()};
`;

const ExternalVideo = ({ video }) => (
  <StyledExternalVideo>
    <Container>
      <Video data={video} />
    </Container>
  </StyledExternalVideo>
);

export default ExternalVideo;
