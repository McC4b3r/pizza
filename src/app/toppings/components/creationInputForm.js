import {
  Box,
  FormControl,
  Center,
  VStack,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react"

export const CreationInputForm = ({
  isDuplicateAddToppingName,
  addToppingName,
  handleToppingNameChange,
  handleEnterKey,
  addRef,
  handleAddToppingSubmit,
  handleCancelAddTopping,
}) => {
  return (
    <Box mt={6}>
      <FormControl isInvalid={isDuplicateAddToppingName}>
        <Center>
          <VStack>
            <Input
              id="addInput"
              width="250px"
              placeholder="Enter new topping name"
              value={addToppingName}
              onChange={handleToppingNameChange}
              onKeyDown={handleEnterKey}
              ref={addRef}
            />
            {isDuplicateAddToppingName && (
              <FormErrorMessage>
                That topping already exists
              </FormErrorMessage>
            )}
          </VStack>
        </Center>
        <Center mt={2}>
          <Button
            colorScheme="teal"
            size="sm"
            ml={2}
            onClick={handleAddToppingSubmit}
            isDisabled={isDuplicateAddToppingName || !addToppingName}
          >
            Ok
          </Button>
          <Button
            colorScheme="red"
            size="sm"
            ml={2}
            onClick={handleCancelAddTopping}
          >
            Cancel
          </Button>
        </Center>
      </FormControl>
    </Box>
  )
}