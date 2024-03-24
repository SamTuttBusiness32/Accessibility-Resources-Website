import { fontWeights } from '../../styles';

export const FontWeight = (value, defaultValue) => {
  switch (value) {
    case 2:
      return fontWeights.regular;
    case 3:
      return fontWeights.bold;
    default:
      return defaultValue;
  }
};
