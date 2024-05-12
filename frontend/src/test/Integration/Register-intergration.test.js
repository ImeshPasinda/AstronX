import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Register from '../../components/authentication/register';

describe('Register component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  });

  it('should show error messages when required fields are not provided', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const registerButton = screen.getByText('Join for Free');
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText('Username is required.')).toBeTruthy();
      expect(screen.getByText('Email is required.')).toBeTruthy();
      expect(screen.getByText('Password is required.')).toBeTruthy();
    });
  });

  it('should successfully register when all required fields are provided', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const registerButton = screen.getByText('Join for Free');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(registerButton);

  });
});
