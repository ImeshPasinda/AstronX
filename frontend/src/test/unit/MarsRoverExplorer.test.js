import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MarsRoverExplorer from '../../components/page/marsRoverExplorer';

describe('MarsRoverExplorer Tests', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <MarsRoverExplorer />
      </BrowserRouter>
    );
  });
});