import React from 'react';
import styled from 'styled-components';
import { sectionMargins } from '../styles';
import { Container, Video } from './ui';

const StyledInternalVideo = styled.section`
  ${sectionMargins()};
`;

const InternalVideo = ({ video }) => (
  <StyledInternalVideo>
    <Container>
      <Video data={video} />
    </Container>
  </StyledInternalVideo>
);

export default InternalVideo;
