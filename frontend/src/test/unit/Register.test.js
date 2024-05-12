import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Regsiter from '../../components/authentication/register';

describe('Register component', () => {
  it('renders without crashing', () => {
    <BrowserRouter>
      render(<Regsiter />);
    </BrowserRouter>
  });
});
