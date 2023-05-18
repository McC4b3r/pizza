export const handleEnter = (event, isAdding, add, update) => {
  if (event.key === 'Enter') {
    isAdding ? add() : update();
  }
}

export const isToppingsEqual = (existing, selected) => {
  return existing.some((pizza) => {
    if (pizza.toppings.length !== selected.length) {
      return false;
    }
    return pizza.toppings.every((topping, i) => {
      return topping.id === selected[i]?.id;
    });
  });
};

export const isDupeName = (pizzas, name) =>
  pizzas.data.some((pizza) =>
    pizza.name.toLowerCase().replace(/[^A-Za-z0-9]/g, '') === name.toLowerCase().replace(/[^A-Za-z0-9]/g, ''));

export const provideDuplicateError = (nameCheck, toppingsCheck) => {
  return nameCheck && toppingsCheck
    ? 'This pizza already exists'
    : nameCheck
      ? 'This name already exists'
      : toppingsCheck
        ? 'A pizza with these toppings already exists'
        : undefined;
};