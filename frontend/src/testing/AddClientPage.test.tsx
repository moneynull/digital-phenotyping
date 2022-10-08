import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import AddClientPage from '../pages/AddClientPage/AddClientPage';

test('Add client failure test', async () => {
  render(
    <MemoryRouter>
      <AddClientPage />
    </MemoryRouter>
  );

  expect(screen.findByText('Add'));
  expect(screen.findByText('Please fill out all required fields.'));
});
