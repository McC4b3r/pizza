/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
// import React from 'react';
// import '@testing-library/jest-dom';
import React from 'react';
import '@testing-library/jest-dom';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';

import {
  useGetPizzas,
  createPizza,
  updatePizzaName,
  updatePizzaToppings,
  deletePizza,
} from '../../../../src/app/pizzas/queries';
import Pizzas from '../../../../src/app/pizzas/page';

jest.mock('../../../../src/app/pizzas/queries');

const setupMock = (pizzasData) => {
  useGetPizzas.mockReturnValue({
    data: { data: pizzasData },
    isLoading: false,
    isError: false,
    trigger: jest.fn(),
  });
};

describe('Pizzas Page', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should allow me to see a list of available pizzas', async () => {
    setupMock([
      {
        id: 1,
        name: 'Lil Pep',
        toppings: [{ id: 1, name: 'Pepperoni' }],
      },
      {
        id: 2,
        name: 'The StrongMind',
        toppings: [
          { id: 2, name: 'Sausage' },
          { id: 3, name: 'Black Truffle' },
          { id: 4, name: 'Jalapeño' },
        ],
      },
    ]);

    render(<Pizzas />);
    const pizzas = await screen.findAllByTestId('pizza-card');

    expect(pizzas).toHaveLength(2);
    expect(pizzas[0]).toHaveTextContent('Lil Pep');
    expect(pizzas[1]).toHaveTextContent('The StrongMind');
  });
});
