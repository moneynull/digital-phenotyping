import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Homepage from '../pages/Homepage/Homepage';

test('logout button test', async () => {
  render(
    <MemoryRouter>
      <Homepage />
    </MemoryRouter>
  );

  expect(screen.findByTestId('SupportAgentIcon'));
  fireEvent.click(screen.getByTestId('SupportAgentIcon'));

  expect(screen.findByRole('login'));
});
