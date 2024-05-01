import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import EarthObservationTracker from './EarthObservationTracker';

jest.mock('axios');

describe('EarthObservationTracker Tests', () => {
  // Integration test
  test('renders TES data correctly', async () => {
    const mockedData = {
      data: {
        id: 'Mock TES ID',
        date: '2024-05-01',
        service_version: '1.0',
        url: 'https://example.com/mock-tes-image.jpg'
      }
    };

    axios.get.mockResolvedValue(mockedData);

    const { getByText, getByAltText } = render(<EarthObservationTracker />);

    await waitFor(() => {
      expect(getByText('Mock TES ID')).toBeInTheDocument();
      expect(getByAltText('NASA APOD')).toHaveAttribute('src', 'https://example.com/mock-tes-image.jpg');
      expect(getByText('Date: 2024-05-01')).toBeInTheDocument();
      expect(getByText('Service Version: 1.0')).toBeInTheDocument();
    });
  });

  // Unit test
  test('renders without crashing', () => {
    render(<EarthObservationTracker />);
  });
});
