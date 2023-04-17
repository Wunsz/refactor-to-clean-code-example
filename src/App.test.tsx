import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

it('renders learn react link', () => {
  render(<App />);
  const buttonElement = screen.getByText(/count is 0*/i);
  expect(buttonElement).toBeInTheDocument();

  act(() => {
    fireEvent.click(buttonElement);
  });

  expect(buttonElement).toHaveTextContent(/count is 1/i);
});
