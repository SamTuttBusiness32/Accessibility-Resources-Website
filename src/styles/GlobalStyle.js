import { createGlobalStyle } from 'styled-components';
import { brandFonts, elementColours, fontSize, fontWeights } from '../styles';

const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    -webkit-font-smoothing: antialiased;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    position: relative;
    margin: 0;
    padding: 0;
    color: ${elementColours.textColour};
    font-family: ${brandFonts.primary};
    font-weight: ${fontWeights.regular};
    ${fontSize(16)};
    line-height: 1.3;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  
  img {
    height: auto;
    width: auto;
    vertical-align: middle;
    max-width: 100%;
    border: 0;
    -ms-interpolation-mode: bicubic;
  }

  button,
  input,
  select,
  textarea {
    color: ${elementColours.textColour};
    font-family: ${brandFonts.primary};
    font-weight: ${fontWeights.regular};
    ${fontSize(16)};
    line-height: 1.3;
  }

  button {
    cursor: pointer;
  }

  input {

    ::-webkit-input-placeholder {
      color: ${elementColours.textColour};
    }

    ::-moz-placeholder {
      color: ${elementColours.textColour};
    }

    :-ms-input-placeholder {
      color: ${elementColours.textColour};
    }

    :-moz-placeholder {
      color: ${elementColours.textColour};
    }
  }
`;

export default GlobalStyle;
