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
import { isToppingsEqual, isDupeName, provideDuplicateError } from '../../helpers';
import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';

export const PizzaCreationForm = ({
  close,
  pizzasData,
  trigger,
  pizzaName,
  setPizzaName,
}) => {

  const [selectedToppings, setSelectedToppings] = useState([]);

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

  const isPizzaValid = !!(pizzaName && selectedToppings.length > 0)

  const handlePizzaName = (e) => setPizzaName(e.target.value);

  const isDuplicateName = isDupeName(pizzasData, pizzaName);

  const isDuplicateToppings = isToppingsEqual(pizzasData.data, selectedToppings)
  const isAnythingDuplicate = !!(isDuplicateName || isDuplicateToppings)

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
                        {provideDuplicateError(isDuplicateName, isDuplicateToppings)}
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