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

  it('should render the PizzaCreationForm when the "Create" button is clicked', async () => {
    setupMock([]);

    const { getByText, queryByTestId } = render(<Pizzas />);

    // Verify that the PizzaCreationForm is not initially rendered
    expect(queryByTestId('pizza-creation-form')).toBeNull();

    const createButton = getByText('Create');
    fireEvent.click(createButton);

    // Verify that the PizzaCreationForm is rendered
    expect(queryByTestId('pizza-creation-form')).toBeInTheDocument();
  });

  it('should allow me to delete an existing pizza', async () => {
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

    deletePizza.mockResolvedValueOnce({ id: 1 });

    const { rerender } = render(<Pizzas />);

    fireEvent.click(screen.getByText('Lil Pep'));
    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => expect(deletePizza).toHaveBeenCalledWith(1));

    setupMock([
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
    rerender(<Pizzas />);

    const pizzas = await screen.findAllByTestId('pizza-card');
    expect(pizzas).toHaveLength(1);
    expect(pizzas[0]).toHaveTextContent('The StrongMind');
  });
});