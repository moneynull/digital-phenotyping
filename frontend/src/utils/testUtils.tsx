import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';

interface RenderWithRouterProps {
  route?: string;
  history?: MemoryHistory;
}

export const renderWithRouter = (
  ui: React.ReactNode,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: RenderWithRouterProps = {}
) => {
  return {
    //@ts-ignore
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
};
