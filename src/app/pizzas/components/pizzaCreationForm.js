/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Center,
  Input,
  Button,
  HStack,
  Heading,
  Grid,
  GridItem,
  Spinner,
  FormControl,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  VStack,
} from '@chakra-ui/react';
import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { useGetAllToppings } from '../../toppings/queries';
import { createPizza } from '../queries';
import {
  isToppingsEqual,
  isDupeName,
  provideDuplicateError,
  handleEnter,
} from '../../helpers';

export function PizzaCreationForm({
  isCreating,
  close,
  pizzasData,
  trigger,
  pizzaName,
  setPizzaName,
}) {
  const [selectedToppings, setSelectedToppings] = useState([]);
  const addRef = useRef(null);

  const { toppings, isLoading, isError } = useGetAllToppings();

  useEffect(() => {
    if (!isLoading && addRef.current) {
      addRef.current.focus();
    }
  }, [isLoading]);

  if (isError) return <div>failed to load</div>;
  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  const handleToppingClick = (toppingId) => {
    if (selectedToppings.some((topping) => topping.id === toppingId)) {
      setSelectedToppings(
        selectedToppings.filter((topping) => topping.id !== toppingId),
      );
    } else {
      setSelectedToppings([...selectedToppings, { id: toppingId }]);
    }
  };

  const handlePizzaName = (e) => setPizzaName(e.target.value);

  const isDuplicateName = isDupeName(pizzasData, pizzaName);

  const isDuplicateToppings = isToppingsEqual(
    pizzasData.data,
    selectedToppings,
  );
  const isAnythingDuplicate = !!(isDuplicateName || isDuplicateToppings);

  const handlePizzaSubmit = () => {
    createPizza({
      name: pizzaName,
      toppings: selectedToppings,
    });
    trigger();
    setPizzaName('');
    close();
  };
  const handleEnterKey = (event) => handleEnter(event, isCreating, handlePizzaSubmit);

  return (
    <Center>
      <Box mt={8} w="lg" borderWidth="1px" borderRadius="lg" padding={4}>
        <Grid templateColumns="repeat(2, 1fr)" gap={24}>
          <GridItem>
            <Box textAlign="center" mb={4}>
              <Heading size="md" mb={4}>
                Available Toppings
              </Heading>
              {toppings.data.map((topping) => (
                <Box
                  onClick={() => handleToppingClick(topping.id)}
                  bg={
                    selectedToppings.some(
                      (selected) => selected.id === topping.id,
                    )
                      ? 'gray.100'
                      : ''
                  }
                  _hover={{ cursor: 'pointer', bg: 'gray.50' }}
                  key={topping.id}
                >
                  {topping.name}
                </Box>
              ))}
            </Box>
          </GridItem>
          <GridItem>
            <Heading size="md" textAlign="center" mb={4}>
              Give it a name
            </Heading>
            <FormControl isInvalid={isAnythingDuplicate}>
              <InputGroup>
                <VStack>
                  <Input
                    placeholder="Pizza name"
                    mb={2}
                    onKeyDown={handleEnterKey}
                    onChange={handlePizzaName}
                    ref={addRef}
                  />
                  {isAnythingDuplicate && (
                    <FormErrorMessage textAlign="center">
                      {provideDuplicateError(
                        isDuplicateName,
                        isDuplicateToppings,
                      )}
                    </FormErrorMessage>
                  )}
                </VStack>
                {pizzaName ? (
                  <InputRightElement>
                    {isAnythingDuplicate ? (
                      <NotAllowedIcon color="red.500" />
                    ) : (
                      <CheckCircleIcon color="green.500" />
                    )}
                  </InputRightElement>
                ) : null}
              </InputGroup>
            </FormControl>
          </GridItem>
        </Grid>
        <HStack spacing={4} justifyContent="center">
          <Button
            onClick={handlePizzaSubmit}
            isDisabled={
              isDuplicateName || !selectedToppings.length || isDuplicateToppings
            }
            colorScheme="teal"
          >
            OK
          </Button>
          <Button colorScheme="red" onClick={close}>
            Cancel
          </Button>
        </HStack>
      </Box>
    </Center>
  );
}
