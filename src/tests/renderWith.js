import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { SWRConfig } from 'swr';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}

function withCacheAndRouter(component, history) {
  const newComponent = (
    <SWRConfig value={ { provider: () => new Map() } }>
      {component}
    </SWRConfig>
  );
  return withRouter(newComponent, history);
}

export function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withCacheAndRouter(component, history)),
    history,
  };
}
