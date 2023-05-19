export const handleEnter = (event, isAdding, add, update) => {
  if (event.key === 'Enter') {
    isAdding ? add() : update();
  }
}

export const isToppingsEqual = (existing, current) => {
  const currentIds = current.map(({ id }) => id);

  return existing.some(({ toppings }) =>
    toppings.some(({ id }) => currentIds.includes(id))
  );
};


export const isDupeName = (pizzas, name) => {
  console.log({ pizzas, name })
  return (
    pizzas.data.some((pizza) =>
      pizza.name.toLowerCase().replace(/[^A-Za-z0-9]/g, '') === name.toLowerCase().replace(/[^A-Za-z0-9]/g, '')));
}

export const provideDuplicateError = (nameCheck, toppingsCheck) => {
  return nameCheck && toppingsCheck
    ? 'This pizza already exists'
    : nameCheck
      ? 'This name already exists'
      : toppingsCheck
        ? 'A pizza with these toppings already exists'
        : undefined;
};