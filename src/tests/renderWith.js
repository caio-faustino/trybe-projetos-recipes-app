import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { act, render } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { mockarCategorias, restaurarFetch } from '../util/mockadores';
import App from '../App';

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

export async function renderizarCaminho(caminho) {
  mockarCategorias();
  renderWithRouter(<App />, { initialEntries: [caminho] });
  await act(async () => { });
  restaurarFetch();
}
