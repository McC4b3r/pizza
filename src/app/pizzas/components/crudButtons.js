import {
  HStack,
  Button,
} from "@chakra-ui/react"

export const CrudButtons = ({
  handleCreationClick,
  selectedPizza,
  handleDeletePizza,
  isCreatingPizza,
  isupdatingEither,
  handleUpdateNameClick,
  handleUpdateToppingsClick,
}) => {
  return (
    <HStack mt={10} justify="center">
      <Button
        data-testid="pizza-creation-button"
        colorScheme="teal"
        size="lg"
        onClick={handleCreationClick}
        isDisabled={selectedPizza || isCreatingPizza}
      >
        Create
      </Button>
      <Button
        colorScheme="red"
        size="lg"
        mr={2}
        onClick={() => handleDeletePizza(selectedPizza)}
        isDisabled={!selectedPizza || isupdatingEither}
      >
        Delete
      </Button>
      <Button
        colorScheme="blue"
        size="lg"
        onClick={handleUpdateNameClick}
        isDisabled={!selectedPizza || isupdatingEither}
      >
        Update Name
      </Button>
      <Button
        colorScheme="blue"
        size="lg"
        onClick={handleUpdateToppingsClick}
        isDisabled={!selectedPizza || isupdatingEither}
      >
        Update Toppings
      </Button>
    </HStack>
  )
}