import React, { useRef } from 'react';
import { InView } from 'react-intersection-observer';
import styled, { css } from 'styled-components';

const StyledVideo = styled.div`
  display: inline-block;
  width: 100%;

  ${({ ratio }) => {
    if (ratio) {
      return css`
        position: relative;
        height: 0;
        padding-bottom: ${ratio}%;
      `;
    }
  }};
`;

const StyledInternalintVideoElement = styled.video`
  height: auto;
  width: 100%;
  max-width: 100%;
`;

const StyledExternalintVideoElement = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

export const Video = ({
  data,
  controls = true,
  muted = true,
  autoPlay = false,
  playsInline = true,
  ...props
}) => {
  const intVideoEl = useRef(null);
  const intVideoSrcEl = useRef(null);

  const playVideo = () => {
    if (autoPlay) {
      intVideoSrcEl.current.src = intVideoSrcEl.current.dataset.src;
      intVideoEl.current.load();
    }
  };

  if (data.format) {
    return (
      <InView triggerOnce={true} onChange={() => playVideo()} {...props}>
        <StyledVideo>
          <StyledInternalintVideoElement
            ref={intVideoEl}
            {...(!autoPlay && { preload: 'none' })}
            {...(!autoPlay &&
              data.video &&
              data.video.thumbnailUrl && { poster: data.video.thumbnailUrl })}
            controls={controls}
            muted={muted}
            autoPlay={autoPlay}
            playsInline={playsInline}
          >
            <source
              ref={intVideoSrcEl}
              {...(autoPlay
                ? { 'data-src': (data.video && data.video.mp4Url) || data.url }
                : { src: (data.video && data.video.mp4Url) || data.url })}
              type="video/mp4"
            />
          </StyledInternalintVideoElement>
        </StyledVideo>
      </InView>
    );
  } else {
    return (
      <StyledVideo
        ratio={
          data.height && data.width ? (data.height / data.width) * 100 : 56.25
        }
        {...props}
      >
        <StyledExternalintVideoElement
          src={
            data.provider === 'youtube'
              ? `https://www.youtube-nocookie.com/embed/${data.providerUid}`
              : data.provider === 'vimeo'
              ? `https://player.vimeo.com/video/${data.providerUid}?dnt=true`
              : `https://www.facebook.com/plugins/data.php?href=${data.url}`
          }
        ></StyledExternalintVideoElement>
      </StyledVideo>
    );
  }
};
