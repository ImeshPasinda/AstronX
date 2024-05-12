import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import EarthObservationTracker from '../components/page/earthObservationTracker';

describe('EarthObservationTracker component', () => {
  it('renders without crashing', () => {
    <BrowserRouter>
      render(<EarthObservationTracker />);
    </BrowserRouter>
  });
});


