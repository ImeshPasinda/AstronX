import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import MarsRoverExplorer from './MarsRoverExplorer';

jest.mock('axios');

describe('MarsRoverExplorer Tests', () => {
  // Integration test
  test('renders Mars Rover data correctly', async () => {
    const mockedData = {
      data: {
        photos: [
          {
            id: 1,
            rover: {
              name: 'Mock Rover',
              status: 'Active',
              max_sol: 1000,
              total_photos: 10000,
              launch_date: '2022-01-01',
              landing_date: '2022-01-02'
            },
            camera: {
              full_name: 'Mock Camera'
            },
            earth_date: '2024-05-01',
            sol: 500,
            img_src: 'https://example.com/mock-image.jpg'
          }
        ]
      }
    };

    axios.get.mockResolvedValue(mockedData);

    const { getByText, getByAltText } = render(<MarsRoverExplorer />);

    await waitFor(() => {
      expect(getByText('Mock Rover')).toBeInTheDocument();
      expect(getByText('Mock Camera')).toBeInTheDocument();
      expect(getByText('Earth Date: 2024-05-01')).toBeInTheDocument();
      expect(getByText('Rover Status: Active')).toBeInTheDocument();
      expect(getByText('Sol: 500')).toBeInTheDocument();
      expect(getByText('Max Sol: 1000')).toBeInTheDocument();
      expect(getByText('Total Photos: 10000')).toBeInTheDocument();
      expect(getByText('Launch Date: 2022-01-01')).toBeInTheDocument();
      expect(getByText('Landing Date: 2022-01-02')).toBeInTheDocument();
      expect(getByAltText('Mars Rover Picture')).toHaveAttribute('src', 'https://example.com/mock-image.jpg');
    });
  });

  // Unit test
  test('renders without crashing', () => {
    render(<MarsRoverExplorer />);
  });
});
