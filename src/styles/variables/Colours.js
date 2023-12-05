export const standardColours = {
  black: '#000',
  darkGrey: '#333333',
  lightGrey: '#F5F5F5',
  white: '#FFF',
  transparentBlack: value => {
    return `rgba(0, 0, 0, ${value})`;
  },
  transparentWhite: value => {
    return `rgba(255, 255, 255, ${value})`;
  },
  transparent: 'rgba(255, 255, 255, 0)',
};

export const brandColours = {
  primary: '#008080', // Cyan
  secondary: '#FF9900', // Orange
};

export const elementColours = {
  textColour: standardColours.darkGrey,
};
