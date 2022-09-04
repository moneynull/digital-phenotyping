import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import InfoDetailsPage from '../pages/InfoDetailsPage/InfoDetailsPage';

test('main feature buttom functionable', async () => {
  render(
    <MemoryRouter>
      <InfoDetailsPage />
    </MemoryRouter>
  );

  expect(screen.findByRole('button', { name: 'Applications' }));
  expect(screen.findByRole('button', { name: 'Communication' }));
  expect(screen.findByRole('button', { name: 'Locations' }));
  expect(screen.findByRole('button', { name: 'Screen' }));
  expect(screen.findByRole('button', { name: 'Client Details' }));
});
