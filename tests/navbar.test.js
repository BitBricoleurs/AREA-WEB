import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AppNavBar from '../src/App/components/AppNavBar';
import { BrowserRouter } from 'react-router-dom';


test('renders Dashboard link in AppNavBar', () => {
    render(
      <BrowserRouter>
        <AppNavBar />
      </BrowserRouter>
    );
    const linkElement = screen.getByText(/Dashboard/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders logo in AppNavBar', () => {
    render(
      <BrowserRouter>
        <AppNavBar />
      </BrowserRouter>
    );
    const logoElement = screen.getByAltText(/PurpleVideo/i);
    expect(logoElement).toBeInTheDocument();
  });

  test('renders Help link in AppNavBar', () => {
    render(
      <BrowserRouter>
        <AppNavBar />
      </BrowserRouter>
    );
    const helpLinkElement = screen.getByText(/Help/i);
    expect(helpLinkElement).toBeInTheDocument();
  });

  test('renders Account link in AppNavBar', () => {
    render(
      <BrowserRouter>
        <AppNavBar />
      </BrowserRouter>
    );
    const accountLinkElements = screen.getAllByText(/Account/i);
    expect(accountLinkElements.length).toBeGreaterThan(0);
    accountLinkElements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });