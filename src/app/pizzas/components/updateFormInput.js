/* eslint-disable import/prefer-default-export */
import React from 'react';

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
import {
  CheckIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import { provideDuplicateError, handleEnter } from '../../helpers';

export function UpdateFormInput({
  isDuplicate,
  pizza,
  updatedPizzaName,
  handleChange,
  handleCancel,
  submit,
}) {
  const handleEnterKey = (e) => handleEnter(e, false, null, submit);

  return (
    <FormControl isInvalid={isDuplicate}>
      <InputGroup>
        <VStack flex="1">
          <Input
            w="100%"
            focusBorderColor={isDuplicate ? 'red.500' : 'blue.500'}
            placeholder={pizza.name}
            value={updatedPizzaName}
            onChange={handleChange}
            onKeyDown={handleEnterKey}
            bg="gray.50"
          />
          <FormErrorMessage>
            {provideDuplicateError(isDuplicate)}
          </FormErrorMessage>
        </VStack>
        <InputRightElement w="4.5rem">
          <ButtonGroup ml="-6px" spacing="4px">
            <Button
              colorScheme="teal"
              h="1.75rem"
              size="xs"
              isDisabled={!updatedPizzaName || isDuplicate}
              onClick={submit}
            >
              <CheckIcon />
            </Button>
            <Button colorScheme="red" h="1.75rem" size="xs" onClick={handleCancel}>
              <CloseIcon />
            </Button>
          </ButtonGroup>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}
