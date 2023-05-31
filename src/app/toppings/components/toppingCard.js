import {
  Card,
  CardBody,
  FormControl,
  InputGroup,
  VStack,
  Input,
  FormErrorMessage,
  InputRightElement,
  ButtonGroup,
  Button,

} from "@chakra-ui/react"
import { CheckIcon, CloseIcon } from "@chakra-ui/icons"

export const ToppingCard = ({
  topping,
  selectedTopping,
  handleToppingClick,
  isUpdatingTopping,
  isDuplicateUpdateToppingName,
  updatedToppingName,
  handleUpdateToppingNameChange,
  handleEnterKey,
  updateRef,
  handleUpdateTopping,
  handleUpdateCancel,
}) => {
  return (
    <Card
      bg={selectedTopping === topping.id ? 'blue.100' : 'blue.50'}
      _hover={{ cursor: 'pointer', bg: 'blue.100' }}
      onClick={() => handleToppingClick(topping.id)}
      key={topping.id}
    >
      <CardBody data-testid="topping-name">
        {selectedTopping === topping.id && isUpdatingTopping ? (
          <FormControl isInvalid={isDuplicateUpdateToppingName}>
            <InputGroup>
              <VStack flex={1}>
                <Input
                  data-testid="topping-update-input"
                  focusBorderColor={
                    isDuplicateUpdateToppingName
                      ? 'red.5P00'
                      : 'blue.500'
                  }
                  placeholder={topping.name}
                  value={updatedToppingName}
                  onChange={handleUpdateToppingNameChange}
                  onKeyDown={handleEnterKey}
                  ref={updateRef}
                  bg="gray.50"
                />
                {isDuplicateUpdateToppingName && (
                  <FormErrorMessage>
                    That topping already exists.
                  </FormErrorMessage>
                )}
              </VStack>
              <InputRightElement>
                <ButtonGroup ml="-36px" spacing="4px">
                  <Button
                    data-testid="update-topping-submit"
                    colorScheme="teal"
                    h="1.75rem"
                    size="xs"
                    isDisabled={
                      !updatedToppingName
                      || isDuplicateUpdateToppingName
                    }
                    onClick={handleUpdateTopping}
                  >
                    <CheckIcon />
                  </Button>
                  <Button
                    colorScheme="red"
                    h="1.75rem"
                    size="xs"
                    onClick={handleUpdateCancel}
                  >
                    <CloseIcon />
                  </Button>
                </ButtonGroup>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        ) : (
          topping.name
        )}
      </CardBody>
    </Card>
  )
}