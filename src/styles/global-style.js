import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  :root {
    --container-width: 1240px;
    --white: #fff;
    --black: #16191a;
    --dark-black: #0f1111;
    --gray: #515151;
    --dark-gray: #3e3e3e;
    --light-gray: #f4f4f4;
    --focus-outline: 2px dotted #949494;
  }

  *,
  *::before,
  *::after { box-sizing: border-box; }

  body {
    margin: 0;
    font-family: hevletica, sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: var(--black);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-weight: 600;
    line-height: 1;
    color: inherit;
  }

  img { max-width: 100%; }

  figure { margin: 0; }

  form { position: relative; }

  button,
  a {
    outline: none;

    &::-moz-focus-inner { border: 0; }

    &:not(:disabled) { cursor: pointer; }
  }
`;

export default GlobalStyle;
