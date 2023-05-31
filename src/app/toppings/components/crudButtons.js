import {
  HStack,
  Button,
} from '@chakra-ui/react'

export const CrudButtons = ({
  isAddButtonDisabled,
  handleAddButtonClick,
  handleDeleteTopping,
  selectedTopping,
  isUpdatingTopping,
  handleUpdateButtonClick,
}) => {
  return (
    <HStack mt={10} justify="center">
      <Button
        data-testid="add-topping-button"
        colorScheme="teal"
        size="lg"
        isDisabled={isAddButtonDisabled}
        onClick={handleAddButtonClick}
      >
        Add
      </Button>
      <Button
        data-testid="delete-topping-button"
        colorScheme="red"
        size="lg"
        mr={2}
        onClick={handleDeleteTopping}
        isDisabled={!selectedTopping || isUpdatingTopping}
      >
        Delete
      </Button>
      <Button
        colorScheme="blue"
        size="lg"
        onClick={handleUpdateButtonClick}
        isDisabled={!selectedTopping || isUpdatingTopping}
      >
        Update
      </Button>
    </HStack>
  )
}