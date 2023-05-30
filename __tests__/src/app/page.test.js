/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../../src/app/page';

describe('Home Page', () => {
  it('renders the proper heading and buttons', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      name: 'Welcome to caberTek Pizza Co.',
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the Manage Toppings button', () => {
    render(<Home />);
    const toppingsButton = screen.getByRole('button', {
      name: 'Manage Toppings',
    });
    expect(toppingsButton).toBeInTheDocument();
  });

  it('renders the Manage Pizzas button', () => {
    render(<Home />);
    const pizzasButton = screen.getByRole('button', {
      name: 'Manage Pizzas',
    });
    expect(pizzasButton).toBeInTheDocument();
  });
});
