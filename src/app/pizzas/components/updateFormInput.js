/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormErrorMessage,
  InputGroup,
  Input,
  ButtonGroup,
  Button,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { provideDuplicateError, handleEnter } from '../../helpers';

export function UpdateFormInput({
  isDuplicate,
  pizza,
  updatedPizzaName,
  handleChange,
  handleCancel,
  submit,
  updateRef,
}) {
  const handleEnterKey = (e) => handleEnter(e, false, null, submit);

  return (
    <FormControl isInvalid={isDuplicate}>
      <InputGroup>
        <VStack flex="1">
          <Input
            data-testid="update-pizza-name-input"
            w="100%"
            focusBorderColor={isDuplicate ? 'red.500' : 'blue.500'}
            placeholder={pizza.name}
            value={updatedPizzaName}
            onChange={handleChange}
            onKeyDown={handleEnterKey}
            bg="gray.50"
            ref={updateRef}
          />
          <FormErrorMessage>
            {provideDuplicateError(isDuplicate)}
          </FormErrorMessage>
        </VStack>
        <InputRightElement w="4.5rem">
          <ButtonGroup ml="-6px" spacing="4px">
            <Button
              data-testid="update-pizza-name-submit"
              colorScheme="teal"
              h="1.75rem"
              size="xs"
              isDisabled={!updatedPizzaName || isDuplicate}
              onClick={submit}
            >
              <CheckIcon />
            </Button>
            <Button
              colorScheme="red"
              h="1.75rem"
              size="xs"
              onClick={handleCancel}
            >
              <CloseIcon />
            </Button>
          </ButtonGroup>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

UpdateFormInput.propTypes = {
  isDuplicate: PropTypes.bool.isRequired,
  pizza: PropTypes.shape(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      toppings: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
  updatedPizzaName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  updateRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};
