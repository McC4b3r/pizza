/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { rerender, render, screen, fireEvent, waitFor } from '@testing-library/react';
import Toppings from '../../../../src/app/toppings/page';
import { createTopping, useGetAllToppings } from '../../../../src/app/toppings/queries';

jest.mock('../../../../src/app/toppings/queries', () => ({
  useGetAllToppings: jest.fn(),
  createTopping: jest.fn(),
  updateTopping: jest.fn(),
  deleteTopping: jest.fn(),
}));

describe('Toppings Page', () => {
  it('should allow me to see a list of available toppings', async () => {
    const mockUseGetAllToppings = jest.fn();
    mockUseGetAllToppings.mockReturnValueOnce({
      toppings: {
        data: [
          { id: 1, name: 'Cheese' },
          { id: 2, name: 'Pepperoni' },
        ],
      },
      isLoading: false,
      isError: false,
      trigger: jest.fn(),
    });
    useGetAllToppings.mockImplementationOnce(mockUseGetAllToppings);

    render(<Toppings />);
    const toppingElements = await screen.findAllByTestId('topping-name');
    expect(toppingElements).toHaveLength(2);
    expect(toppingElements[0]).toHaveTextContent('Cheese');
    expect(toppingElements[1]).toHaveTextContent('Pepperoni');
  });

  it('should allow me to add a new topping', async () => {
    // const initialLoadToppings = jest.fn().mockReturnValueOnce({
    //   toppings: {
    //     data: [
    //       { id: 1, name: 'Cheese' },
    //       { id: 2, name: 'Pepperoni' },
    //     ],
    //   },
    //   isLoading: false,
    //   isError: false,
    //   trigger: jest.fn(),
    // });

    // console.log({ initialLoadToppings: initialLoadToppings.mock.results });

    // useGetAllToppings.mockImplementation(initialLoadToppings);

    // render(<Toppings />);
    // const addToppingButton = screen.getByTestId('add-topping-button');

    // fireEvent.click(addToppingButton);

    // const addToppingInput = await screen.findByPlaceholderText('Enter new topping name');
    // fireEvent.change(addToppingInput, { target: { value: 'Mushrooms' } });

    // const okButton = await screen.findByText(/Ok/i);
    // createTopping.mockReturnValueOnce({ name: 'Mushrooms' });
    // fireEvent.click(okButton);

    // await waitFor(() => expect(createTopping).toHaveBeenCalledWith({ name: 'Mushrooms' }));

    // const afterAddTopping = jest.fn().mockReturnValueOnce({
    //   toppings: {
    //     data: [
    //       { id: 1, name: 'Cheese' },
    //       { id: 2, name: 'Pepperoni' },
    //       { id: 3, name: 'Mushrooms' },
    //     ],
    //   },
    //   isLoading: false,
    //   isError: false,
    //   trigger: jest.fn(),
    // });

    // useGetAllToppings.mockImplementation(afterAddTopping);

    // rerender(<Toppings />);
    // // console.log({ CONTAINER: container });
    // rerender(<Toppings />);
    // const toppingElements = await screen.findAllByTestId('topping-name');
    // expect(toppingElements).toHaveLength(3);
    // expect(toppingElements[2]).toHaveTextContent('Mushrooms');
  });
});
