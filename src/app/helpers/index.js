/* eslint-disable no-unused-expressions */
export const handleEnter = (event, isAdding, add, update) => {
  if (event.key === 'Enter') {
    isAdding ? add() : update();
  }
};

export const isToppingsEqual = (existing, current) => (
  existing?.some(({ toppings }) => toppings.length === current.length
    && current.every(({ id }) => toppings.some(({ id: existingId }) => id === existingId)))
);

export const isDupeName = (pizzas, name) => (
  pizzas?.data.some((pizza) => pizza.name.toLowerCase().replace(/[^A-Za-z0-9]/g, '') === name?.toLowerCase().replace(/[^A-Za-z0-9]/g, '')));

export const provideDuplicateError = (nameCheck, toppingsCheck) => {
  if (nameCheck && toppingsCheck) {
    return 'This pizza already exists';
  } if (nameCheck) {
    return 'This name already exists';
  } if (toppingsCheck) {
    return 'A pizza with these toppings already exists';
  }
  return undefined;
};
