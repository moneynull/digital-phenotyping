import { findByText, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import InfoDetailsPage from '../pages/InfoDetailsPage/InfoDetailsPage';
import { createMemoryHistory } from 'history';
import { renderWithRouter } from '../utils/testUtils';
import Homepage from '../pages/Homepage/Homepage';
import Loginpage from '../pages/Login/Loginpage';

test('main feature buttom functionable', async () => {
  const clientInfoData = {
    uid: 6,
    clinician_id: '5',
    client_title: 'Ms.',
    first_name: 'Tom',
    last_name: 'Garcia',
    date_of_birth: '1986-10-01',
    age: 35,
    text_notes: '',
    status: 'Normal',
    twitter_id: '19009817',
    facebook_id: '',
    aware_device_id: '0e6b7ce2-633e-476a-9ca3-a19240faeca1',
    last_update: '2022-09-19T06:43:04Z',
    twitter_id_int: '19009817',
  };
  render(
    <MemoryRouter>
      <Routes>
        <Route path='/' element={<Loginpage />} />
        <Route path='/homepage' element={<Homepage />} />
        <Route path='/info' element={<InfoDetailsPage />} />
      </Routes>
    </MemoryRouter>
  );
  fireEvent.change(screen.getByRole(/account/i), {
    target: { value: 'tony@gmail.com' },
  });
  fireEvent.change(screen.getByRole(/password/i), {
    target: { value: 'P@ssword2' },
  });

  fireEvent.click(screen.getByText(/Login/i));
  await waitFor(() => expect(screen.findByText('View')), { timeout: 4000 });
});
