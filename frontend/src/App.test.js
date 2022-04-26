import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

describe('snapshot', () => {
  it('library render', () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});

it('renders no crashing', () =>{
  const div = document.createElement('div');
  //ReactDOM.render(<App />, div);
} );

