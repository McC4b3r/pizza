export const handleEnter = (event, isAdding, add, update) => {
  if (event.key === 'Enter') {
    isAdding ? add() : update();
  }
}