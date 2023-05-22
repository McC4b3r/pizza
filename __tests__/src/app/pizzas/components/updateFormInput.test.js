/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
// import React from 'react';
// import '@testing-library/jest-dom';
import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { updatePizzaName } from '../../../../../src/app/pizzas/queries';
import { UpdateFormInput } from '../../../../../src/app/pizzas/components/updateFormInput';

jest.mock('../../../../../src/app/pizzas/queries');

describe('Update Form Input', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should allow me to update the name of an existing pizza', async () => {
    render(
      <UpdateFormInput
        isDuplicate={false}
        pizza={{ id: 1, name: 'Lil Pep' }}
        updatedPizzaName="The Test"
        handleChange={jest.fn()}
        handleCancel={jest.fn()}
        submit={jest.fn().mockReturnValue(updatePizzaName(1, 'The Test'))}
      />,
    );

    const submitButton = await screen.findByTestId('update-pizza-name-submit');
    fireEvent.click(submitButton);

    await waitFor(() => expect(updatePizzaName).toHaveBeenCalledWith(1, 'The Test'));
  });

  it('should not allow me to create a pizza with duplicate name', async () => {
    render(
      <UpdateFormInput
        isDuplicate
        pizza={{ id: 1, name: 'Lil Pep' }}
        updatedPizzaName="Lil Pep"
        handleChange={jest.fn()}
        handleCancel={jest.fn()}
        submit={jest.fn()}
      />,
    );

    const submitButton = await screen.findByTestId('update-pizza-name-submit');

    expect(submitButton).toBeDisabled();
  });
});
