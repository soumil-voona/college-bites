import { render, screen } from '@testing-library/react';
import Information from './Information'; // Updated to test the default route

test('renders Information page', () => {
  render(<Information />);
  const headerElement = screen.getByText(/Share homemade love/i);
  expect(headerElement).toBeInTheDocument();
});
