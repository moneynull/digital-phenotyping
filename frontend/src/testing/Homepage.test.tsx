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

  expect(screen.findByRole('button', { name: 'Log Out' }));
  fireEvent.click(screen.getByRole('button', { name: 'Log Out' }));
  expect(screen.findByText('Loginpage'));
  expect(screen.findByRole('button', { name: 'Login' }));
});
