/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import Toppings from '../../../../src/app/toppings/page';
import {
  useGetAllToppings,
  createTopping,
  deleteTopping,
  updateTopping,
} from '../../../../src/app/toppings/queries';

jest.mock('../../../../src/app/toppings/queries');

const setupMock = (toppingsData) => {
  useGetAllToppings.mockReturnValue({
    toppings: { data: toppingsData },
    isLoading: false,
    isError: false,
    trigger: jest.fn(),
  });
};

describe('Toppings Page', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should allow me to see a list of available toppings', async () => {
    setupMock([
      { id: 1, name: 'Cheese' },
      { id: 2, name: 'Pepperoni' },
    ]);

    render(<Toppings />);
    const toppingElements = await screen.findAllByTestId('topping-name');

    expect(toppingElements).toHaveLength(2);
    expect(toppingElements[0]).toHaveTextContent('Cheese');
    expect(toppingElements[1]).toHaveTextContent('Pepperoni');
  });

  it('should allow me to add a new topping', async () => {
    setupMock([
      { id: 1, name: 'Cheese' },
      { id: 2, name: 'Pepperoni' },
    ]);
    createTopping.mockResolvedValueOnce({ name: 'Mushrooms' });

    const { rerender } = render(<Toppings />);

    fireEvent.click(screen.getByTestId('add-topping-button'));
    fireEvent.change(
      await screen.findByPlaceholderText('Enter new topping name'),
      { target: { value: 'Mushrooms' } },
    );
    fireEvent.click(await screen.findByText(/Ok/i));

    await waitFor(() => expect(createTopping).toHaveBeenCalledWith('Mushrooms'));

    setupMock([
      { id: 1, name: 'Cheese' },
      { id: 2, name: 'Pepperoni' },
      { id: 3, name: 'Mushrooms' },
    ]);

    rerender(<Toppings />);

    const toppingElements = await screen.findAllByTestId('topping-name');
    expect(toppingElements).toHaveLength(3);
    expect(toppingElements[2]).toHaveTextContent('Mushrooms');
  });

  it('should allow me to delete an existing topping', async () => {
    setupMock([
      { id: 1, name: 'Cheese' },
      { id: 2, name: 'Pepperoni' },
    ]);
    deleteTopping.mockResolvedValueOnce({ id: 1, name: 'Cheese' });

    const { rerender } = render(<Toppings />);

    fireEvent.click(screen.getByText('Cheese'));
    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => expect(deleteTopping).toHaveBeenCalledWith(1));

    setupMock([{ id: 2, name: 'Pepperoni' }]);
    rerender(<Toppings />);

    const toppingElements = await screen.findAllByTestId('topping-name');
    expect(toppingElements).toHaveLength(1);
    expect(toppingElements[0]).toHaveTextContent('Pepperoni');
  });

  it('should allow me to update an existing topping', async () => {
    setupMock([
      { id: 1, name: 'Cheese' },
      { id: 2, name: 'Pepperoni' },
    ]);
    updateTopping.mockResolvedValueOnce({ id: 1, name: 'Bacon' });

    const { rerender } = render(<Toppings />);

    fireEvent.click(screen.getByText('Cheese'));
    fireEvent.click(screen.getByText('Update'));

    fireEvent.change(await screen.findByTestId('topping-update-input'), {
      target: { value: 'Bacon' },
    });
    fireEvent.click(await screen.findByTestId('update-topping-submit'));

    await waitFor(() => expect(updateTopping).toHaveBeenCalledWith(1, 'Bacon'));

    setupMock([
      { id: 1, name: 'Bacon' },
      { id: 2, name: 'Pepperoni' },
    ]);
    rerender(<Toppings />);

    expect(screen.getByText('Bacon')).toBeInTheDocument();
  });

  it('should not allow me to enter duplicate toppings', async () => {
    setupMock([
      { id: 1, name: 'Cheese' },
      { id: 2, name: 'Pepperoni' },
    ]);

    const { getByText } = render(<Toppings />);

    fireEvent.click(screen.getByTestId('add-topping-button'));
    fireEvent.change(
      await screen.findByPlaceholderText('Enter new topping name'),
      { target: { value: 'Cheese' } },
    );
    fireEvent.click(getByText('Ok'));

    const errorMessage = await screen.findByText('That topping already exists');

    expect(createTopping).not.toHaveBeenCalled();
    expect(getByText('Ok')).toBeDisabled();
    expect(errorMessage).toBeInTheDocument();
  });
});
