export const handleEnter = (event, isAdding, add, update) => {
  if (event.key === 'Enter') {
    isAdding ? add() : update();
  }
};

export const isToppingsEqual = (existing, current) => existing.some(({ toppings }) => toppings.length === current.length
    && current.every(({ id }) => toppings.some(({ id: existingId }) => id === existingId)));

export const isDupeName = (pizzas, name) => (
  pizzas.data.some((pizza) => pizza.name.toLowerCase().replace(/[^A-Za-z0-9]/g, '') === name.toLowerCase().replace(/[^A-Za-z0-9]/g, '')));

export const provideDuplicateError = (nameCheck, toppingsCheck) => (nameCheck && toppingsCheck
  ? 'This pizza already exists'
  : nameCheck
    ? 'This name already exists'
    : toppingsCheck
      ? 'A pizza with these toppings already exists'
      : undefined);
