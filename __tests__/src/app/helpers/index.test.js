/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */

import { isToppingsEqual } from '../../../../src/app/helpers';

describe('Global Helper Functions', () => {
  it('should ensure no pizza can be updated with toppings that already exist on a pizza', async () => {
    const existingPizzas = [
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
    ];

    const duplicateToppings = [
      { id: 2 },
      { id: 3 },
      { id: 4 },
    ];

    const uniqueToppings = [
      { id: 1 },
      { id: 4 },
    ];

    expect(isToppingsEqual(existingPizzas, duplicateToppings)).toBe(true);
    expect(isToppingsEqual(existingPizzas, uniqueToppings)).toBe(false);
  });
});
