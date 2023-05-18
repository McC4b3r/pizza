import {
  FormControl,
  FormErrorMessage,
  InputGroup,
  Input,
  ButtonGroup,
  Button,
  InputRightElement,
  VStack,
} from '@chakra-ui/react'
import {
  CheckIcon,
  CloseIcon,
  CheckCircleIcon,
  NotAllowedIcon,
} from '@chakra-ui/icons'
import { provideDuplicateError } from '../../helpers'

export const UpdateFormInput = ({
  isDuplicate,
  pizza,
  updatedPizzaName,
  handleUpdatePizzaNameChange,
  handleEnter,
  handleUpdateCancel,
  submit,
}) => {
  console.log({ UPDATEFORMINPUT: isDuplicate })
  return (
    <>
      <FormControl isInvalid={isDuplicate}>
        <InputGroup>
          <VStack flex="1">
            <Input
              w="100%"
              focusBorderColor={isDuplicate ? 'red.500' : 'blue.500'}
              placeholder={pizza.name}
              value={updatedPizzaName}
              onChange={handleUpdatePizzaNameChange}
              onKeyDown={handleEnter}
              bg="gray.50"
            />
            <FormErrorMessage>
              {provideDuplicateError(isDuplicate)}
            </FormErrorMessage>
          </VStack>
          <InputRightElement w="4.5rem">
            <ButtonGroup ml="-6px" spacing='4px'>
              <Button
                colorScheme="teal"
                h='1.75rem'
                size='xs'
                isDisabled={!updatedPizzaName}
                onClick={submit}>
                <CheckIcon />
              </Button>
              <Button colorScheme="red" h='1.75rem' size='xs' onClick={handleUpdateCancel}>
                <CloseIcon />
              </Button>
            </ButtonGroup>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  )
}