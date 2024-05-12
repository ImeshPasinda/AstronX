import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ApodViewer from '../components/page/apodViewer';

describe('ApodViewer component', () => {
  it('renders without crashing', () => {
    <BrowserRouter>
      render(<ApodViewer />);
    </BrowserRouter>
  });
});
