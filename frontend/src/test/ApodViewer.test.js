import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import ApodViewer from './ApodViewer';

jest.mock('axios');

describe('ApodViewer Tests', () => {
  // Integration test
  test('renders APOD data correctly', async () => {
    const mockedData = {
      data: {
        title: 'Mock APOD Title',
        explanation: 'Mock APOD Explanation',
        hdurl: 'https://example.com/mock-apod.jpg',
        date: '2024-05-01',
        service_version: '1.0'
      }
    };

    axios.get.mockResolvedValue(mockedData);

    const { getByText, getByAltText } = render(<ApodViewer />);

    await waitFor(() => {
      expect(getByText('Mock APOD Title')).toBeInTheDocument();
      expect(getByText('Mock APOD Explanation')).toBeInTheDocument();
      expect(getByAltText('NASA APOD')).toHaveAttribute('src', 'https://example.com/mock-apod.jpg');
      expect(getByText('Date: 2024-05-01')).toBeInTheDocument();
      expect(getByText('Version: 1.0')).toBeInTheDocument();
    });
  });

  // Unit test
  test('renders without crashing', () => {
    render(<ApodViewer />);
  });
});
