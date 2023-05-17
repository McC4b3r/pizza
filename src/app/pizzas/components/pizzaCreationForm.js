import React, { useState } from 'react';
import { getAllToppings } from '../../toppings/queries'
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
  VStack
} from '@chakra-ui/react';
import { createPizza } from '../queries';
import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';

export const PizzaCreationForm = ({ close, pizzasData, trigger }) => {
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [pizzaName, setPizzaName] = useState('');

  const { toppings, isLoading, isError } = getAllToppings();
  if (isError) return <div>failed to load</div>
  if (isLoading) return <Center><Spinner /></Center>

  const handleToppingClick = (toppingId) => {
    if (selectedToppings.some(topping => topping.id === toppingId)) {
      setSelectedToppings(selectedToppings.filter(topping => topping.id !== toppingId));
    } else {
      setSelectedToppings([...selectedToppings, { id: toppingId }]);
    }
  };

  // validation to ensure no empty pizzas are created
  const isPizzaValid = !!(pizzaName && selectedToppings.length > 0)

  const handlePizzaName = (e) => setPizzaName(e.target.value);

  // check if selected toppings match toppings on an existing pizza
  const isToppingsEqual = (existing, selected) => {
    return existing.some((pizza) => {
      if (pizza.toppings.length !== selected.length) {
        return false;
      }
      return pizza.toppings.every((topping, i) => {
        return topping.id === selected[i]?.id;
      });
    });
  };

  // validation to ensure no duplicate pizza names
  const isDuplicateName = pizzasData.data.some((pizza) => pizza.name.toLowerCase() === pizzaName.toLowerCase());
  // validation to ensure no dudplicate pizza toppings
  const isDuplicateToppings = isToppingsEqual(pizzasData.data, selectedToppings)
  const isAnythingDuplicate = !!(isDuplicateName || isDuplicateToppings)
  const provideDuplicateError = () => {
    return isDuplicateName && isDuplicateToppings
      ? 'This pizza already exists'
      : isDuplicateName
        ? 'This name already exists'
        : isDuplicateToppings
          ? 'A pizza with these toppings already exists'
          : undefined;
  };

  const handlePizzaSubmit = () => {
    createPizza({
      name: pizzaName,
      toppings: selectedToppings
    });
    trigger();
    close();
  }

  return (
    <>
      <Center>
        <Box w="lg" borderWidth="1px" borderRadius="lg" padding={4}>
          <Grid templateColumns='repeat(2, 1fr)' gap={24}>
            <GridItem>
              <Box textAlign="center" mb={4}>
                <Heading size="md" mb={4} >
                  Select Toppings
                </Heading>
                {toppings.data.map((topping) => (
                  <Box onClick={() => handleToppingClick(topping.id)}
                    bg={selectedToppings.some(selected => selected.id === topping.id) ? 'gray.100' : ''}
                    _hover={{ cursor: 'pointer', bg: 'gray.50' }}
                    key={topping.id}>
                    {topping.name}
                  </Box>
                ))}
              </Box>
            </GridItem>
            <GridItem>
              <Heading size="md" textAlign="center" mb={4} >
                Give it a name
              </Heading>
              <FormControl isInvalid={isAnythingDuplicate}>
                <InputGroup>
                  <VStack>
                    <Input placeholder="Pizza name" mb={2} onChange={handlePizzaName} />
                    {isAnythingDuplicate &&
                      <FormErrorMessage>
                        {provideDuplicateError()}
                      </FormErrorMessage>}
                  </VStack>
                  {pizzaName
                    ? <InputRightElement>
                      {isAnythingDuplicate
                        ? <NotAllowedIcon color='red.500' />
                        : <CheckCircleIcon color='green.500' />}
                    </InputRightElement>
                    : null}
                </InputGroup>
              </FormControl>
            </GridItem>
          </Grid>

          <HStack spacing={4} justifyContent="center" >
            <Button
              onClick={handlePizzaSubmit}
              isDisabled={isAnythingDuplicate || !isPizzaValid}
              colorScheme="teal">
              OK
            </Button>
            <Button colorScheme="red" onClick={close}>Cancel</Button>
          </HStack>
        </Box>
      </Center>
    </>
  );
};