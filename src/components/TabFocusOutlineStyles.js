import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { useIsTabbing } from 'use-is-tabbing';

const TabStyles = createGlobalStyle`
  a,
  button {
    &:focus {
      outline: var(--focus-outline);
      outline-offset: 2px;
    }
  }
`;

const TabFocusOutlineStyles = () => {
  const showTabOutline = useIsTabbing();

  return showTabOutline ? <TabStyles /> : null;
};

export default TabFocusOutlineStyles;
