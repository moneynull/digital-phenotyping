import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Loginpage from '../pages/Login/Loginpage';
import { MemoryRouter } from 'react-router-dom';
import { BASE_URL } from '../constant/Endpoint';

const fakeClinicianInfo = {
  refresh:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY2NDI0NDA0NSwiaWF0IjoxNjY0MTU3NjQ1LCJqdGkiOiJmNzAyN2Y5NjEyYmY0MTBmOTVmOTczODU2ZGFmMGFhZCIsInVzZXJfaWQiOjQ5fQ.YQkwHVnH5Ko49WwLiJDJnNvCqdqBrW0JQ5JBUCwogkE',
  access:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY0MjQ0MDQ1LCJpYXQiOjE2NjQxNTc2NDUsImp0aSI6IjEyMmU2MzM0NTU1NTQ1NGQ4ZjcyOTVkYWQwZmIwNTFkIiwidXNlcl9pZCI6NDl9.afdEUW6fqMhZ_Qk-v_dimNSBcpwMuvqQmyPHc_SuoYM',
  user_info: {
    id: 49,
    username: 'Tony',
    first_name: 'Tony',
    last_name: 'Furgeson',
    email: 'tony@gmail.com',
    is_staff: 1,
  },
};
const server = setupServer(
  rest.post(BASE_URL + '/login/', (req, res, ctx) => {
    return res(ctx.json(fakeClinicianInfo));
  })
);
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

test('allows the user to login successfully', async () => {
  render(
    <MemoryRouter>
      <Loginpage />
    </MemoryRouter>
  );

  // fill out the form
  fireEvent.change(screen.getByRole(/account/i), {
    target: { value: 'tony@gmail.com' },
  });
  fireEvent.change(screen.getByRole(/password/i), {
    target: { value: 'P@ssword2' },
  });

  fireEvent.click(screen.getByText(/Login/i));
  await waitFor(() => expect(screen.getByRole('login')).toHaveTextContent(/Login/i));
  await waitFor(() => expect(screen.getByRole(/password/i)).toHaveTextContent(''));
  await waitFor(() =>
    expect(window.sessionStorage.getItem('userInfo')).toEqual(JSON.stringify(fakeClinicianInfo))
  );
});
