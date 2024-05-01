import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Register from './Register';

jest.mock('axios');

describe('Register Tests', () => {
  // Integration test
  test('registers user successfully', async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);

    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });

    axios.post.mockResolvedValueOnce({ status: 201 });

    fireEvent.click(getByText('Join for Free'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/api/register'), {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password',
      });
    });
  });

  // Unit tests
  test('renders without crashing', () => {
    render(<Register />);
  });

  test('displays error message for invalid email', async () => {
    const { getByText, getByPlaceholderText } = render(<Register />);
    
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.click(getByText('Join for Free'));

    await waitFor(() => {
      expect(getByText('Invalid email.')).toBeInTheDocument();
    });
  });

  test('displays error message for missing username, email, and password', async () => {
    const { getByText } = render(<Register />);
    
    fireEvent.click(getByText('Join for Free'));

    await waitFor(() => {
      expect(getByText('Username is required.')).toBeInTheDocument();
      expect(getByText('Email is required.')).toBeInTheDocument();
      expect(getByText('Password is required.')).toBeInTheDocument();
    });
  });
});
