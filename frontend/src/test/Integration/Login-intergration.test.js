import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../components/authentication/login';

describe('Login component', () => {
  it('renders without crashing', () => {
    render(<Login />);
  });

  it('should show error message when email and password are not provided', async () => {
    const { getByText, getByRole } = render(<Login />);

    const loginButton = getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getByText('Email is required.')).toBeTruthy();
      expect(getByText('Password is required.')).toBeTruthy();
    });
  });

  it('should not show error message when valid email and password are provided', async () => {
    const { getByPlaceholderText, queryByText, getByRole } = render(<Login />);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(queryByText('Email is required.')).toBeNull();
      expect(queryByText('Password is required.')).toBeNull();
    });
  });

  it('should show error message when invalid email format is provided', async () => {
    const { getByPlaceholderText, getByText, getByRole } = render(<Login />);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByRole('button', { name: 'Login' });

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(getByText('Invalid email.')).toBeTruthy();
    });
  });
});
