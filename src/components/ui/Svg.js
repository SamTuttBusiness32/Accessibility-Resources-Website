import React from 'react';

export const Svg = ({ image, ...props }) => {
  const Component = image;
  return <Component role="img" {...props} />;
};
