import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../components/authentication/login';

describe('Login component', () => {
  it('renders without crashing', () => {
    <BrowserRouter>
      render(<Login />);
    </BrowserRouter>
  });
});
