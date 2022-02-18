/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import '@testing-library/jest-dom'

// Test App Component
describe('App', () => {
    test('renders App component', () => {
        render(<App />);
    });
    test('sees welcome text', () => {
        render(<App />);
        expect(screen.getByText("Hello from React!")).toBeInTheDocument();
    });
});