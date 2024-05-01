import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Login from './Login';

jest.mock('axios');

describe('Login Tests', () => {
  // Integration test
  test('logs in user successfully', async () => {
    const mockedToken = 'mockedToken';
    const mockedDecodedToken = { userId: 'mockedUserId' };

    axios.post.mockResolvedValueOnce({ data: { token: mockedToken } });
    
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const locationAssignSpy = jest.spyOn(window.location, 'assign').mockImplementation(() => {});

    const { getByPlaceholderText, getByText } = render(<Login />);

    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });

    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalledWith('authToken', mockedToken, { expires: 2 });
      expect(setItemSpy).toHaveBeenCalledWith('uData', expect.any(String));
      expect(locationAssignSpy).toHaveBeenCalledWith('/navigate-to-home');
    });

    setItemSpy.mockRestore();
    locationAssignSpy.mockRestore();
  });

  // Unit test
  test('renders without crashing', () => {
    render(<Login />);
  });

  test('displays error message for invalid email', async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Invalid email.')).toBeInTheDocument();
    });
  });

  test('displays error message for missing email and password', async () => {
    const { getByText } = render(<Login />);
    
    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Email is required.')).toBeInTheDocument();
      expect(getByText('Password is required.')).toBeInTheDocument();
    });
  });
});
