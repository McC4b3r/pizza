/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
// import React from 'react';
// import '@testing-library/jest-dom';
import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { createPizza } from '../../../../../src/app/pizzas/queries';
import { useGetAllToppings } from '../../../../../src/app/toppings/queries';
import { PizzaCreationForm } from '../../../../../src/app/pizzas/components/pizzaCreationForm';

jest.mock('../../../../../src/app/pizzas/queries');
jest.mock('../../../../../src/app/toppings/queries');

afterEach(() => {
  jest.resetAllMocks();
});

const setup = () => {
  useGetAllToppings.mockReturnValue({
    toppings: {
      data: [
        {
          id: 1,
          name: 'Pepperoni',
        },
      ],
    },
    isLoading: false,
    isError: false,
    trigger: jest.fn(),
  });

  createPizza.mockResolvedValueOnce({
    name: 'Lil Pep',
    toppings: [
      { id: 1 },
    ],
  });

  const mockFns = {
    trigger: jest.fn(),
    close: jest.fn(),
    setPizzaName: jest.fn(),
  };

  const utils = render(
    <PizzaCreationForm
      pizzasData={
        {
          data: [
            {
              id: 2,
              name: 'The Test',
              toppings: [
                {
                  id: 2,
                  name: 'Sausage',
                },
              ],
            },
          ],
        }
      }
      pizzaName="Lil Pep"
      trigger={jest.fn()}
      close={jest.fn()}
      setPizzaName={jest.fn()}
    />,
  );

  return { ...utils, ...mockFns };
};

test('creates a new pizza and adds toppings to it', async () => {
  setup();

  fireEvent.change(await screen.findByPlaceholderText('Pizza name'), { target: { value: 'Lil Pep' } });
  fireEvent.click(await screen.findByTestId('pcf-pizza-topping'));
  fireEvent.click(await screen.findByText(/Ok/i));

  await waitFor(() => expect(createPizza).toHaveBeenCalledWith({
    name: 'Lil Pep',
    toppings: [
      { id: 1 },
    ],
  }));
});
