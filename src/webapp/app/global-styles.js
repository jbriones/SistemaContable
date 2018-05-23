import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Avenir LT Std;
  }

  body.fontLoaded {
    font-family: 'Avenir LT Std;
  }

  #app {
    background-color: #ffffff;
    min-height: 100%;
    min-width: 100%;
    font-family: 'Avenir LT Std';
  }

  p,
  div,
  label {
    font-family: 'Avenir LT Std';
    line-height: 1.5em;
  }
`;
