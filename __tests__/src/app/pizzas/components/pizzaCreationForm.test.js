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
import { createPizza } from '../../../../../src/app/pizzas/queries';
import { useGetAllToppings } from '../../../../../src/app/toppings/queries';
import { PizzaCreationForm } from '../../../../../src/app/pizzas/components/pizzaCreationForm';

jest.mock('../../../../../src/app/pizzas/queries');
jest.mock('../../../../../src/app/toppings/queries');

describe('Pizza Creation Form', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const setupToppingsMock = (toppingsData) => {
    useGetAllToppings.mockReturnValue({
      toppings: { data: toppingsData },
      isLoading: false,
      isError: false,
      trigger: jest.fn(),
    });
  };

  it('should allow me to create a pizza', async () => {
    setupToppingsMock([{ id: 1, name: 'Pepperoni' }]);
    createPizza.mockResolvedValueOnce({
      name: 'Lil Pep',
      toppings: [{ id: 1 }],
    });

    render(
      <PizzaCreationForm
        pizzasData={
          {
            data: [{
              id: 2,
              name: 'The Test',
              toppings: [
                { id: 2, name: 'Sausage' },
              ],
            }],
          }
        }
        trigger={jest.fn()}
        close={jest.fn()}
        pizzaName="Lil Pep"
        setPizzaName={jest.fn()}
      />,
    );

    fireEvent.change(
      await screen.findByPlaceholderText('Pizza name'),
      { target: { value: 'Lil Pep' } },
    );

    fireEvent.click(await screen.findByTestId('pcf-pizza-topping'));

    fireEvent.click(await screen.findByText(/Ok/i));

    await waitFor(() => expect(createPizza).toHaveBeenCalledWith({
      name: 'Lil Pep',
      toppings: [{ id: 1 }],
    }));
  });
});
