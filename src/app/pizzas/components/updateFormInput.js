import {
  FormControl,
  InputGroup,
  Input,
  ButtonGroup,
  Button,
  InputRightElement,
} from '@chakra-ui/react'
import {
  CheckIcon,
  CloseIcon,
} from '@chakra-ui/icons'

export const UpdateFormInput = ({
  isDuplicate,
  pizza,
  updatedPizzaName,
  handleUpdatePizzaNameChange,
  handleEnter,
  handleUpdateCancel,
  submit,
}) => {
  return (
    <>
      <FormControl isInvalid={isDuplicate}>
        <InputGroup>
          <Input
            focusBorderColor={isDuplicate ? 'red.500' : 'blue.500'}
            placeholder={pizza.name}
            value={updatedPizzaName}
            onChange={handleUpdatePizzaNameChange}
            onKeyDown={handleEnter}
            bg="gray.50"
          />
          <InputRightElement>
            <ButtonGroup ml="-36px" spacing='4px'>
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