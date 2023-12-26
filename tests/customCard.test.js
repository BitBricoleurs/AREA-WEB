import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomCard from '../src/App/components/CustomCard';
import '@testing-library/jest-dom';

describe('CustomCard', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    render(<CustomCard serviceName="Test Service" description="Test Description" onSelect={mockOnSelect} />);
  });

  test('renders service name', () => {
    const serviceNameElement = screen.getByText(/Test Service/i);
    expect(serviceNameElement).toBeInTheDocument();
  });

  test('renders service description', () => {
    const descriptionElement = screen.getByText(/Test Description/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('calls onSelect prop when select button is clicked', async () => {
    const selectButton = screen.getByText(/Select/i);
    userEvent.click(selectButton);
    await waitFor(() => expect(mockOnSelect).toHaveBeenCalledTimes(1));
  });
});