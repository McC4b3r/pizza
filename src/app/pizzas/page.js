'use client'

import { useState } from 'react';
import {
  Heading,
  Button,
  Link,
  Center,
  Spinner,
  Box,
  HStack,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { PizzaCreationForm } from './components'
import { getPizzas } from './queries';

export default function Pizzas() {
  const [isCreatingPizza, setIsCreatingPizza] = useState(false);

  const handleCreationClick = () => setIsCreatingPizza(true);
  const handleClosePizzaCreationForm = () => setIsCreatingPizza(false);

  const {
    data: pizzasData,
    isLoading,
    error,
    trigger,
  } = getPizzas();

  if (error) return <div>failed to load</div>
  if (isLoading) return <Center><Spinner /></Center>

  return (
    <>
      <Link href='/'>
        <Button colorScheme='teal' leftIcon={<ArrowBackIcon />} mt={2} ml={2} size="sm" variant="ghost" >
          Home
        </Button>
      </Link>
      <Heading as="h1" size="xl" textAlign="center" mt={10}>
        Pizzas
      </Heading>
      <Center mt={20} mb={10}>
        <VStack>
          <Heading size="md" textAlign="center" mb={4}>
            Signature Pies
          </Heading>
          <Accordion minWidth="lg" allowToggle>
            {pizzasData.data.map((pizza) => (
              <AccordionItem>
                <Heading size="md">
                  <AccordionButton _expanded={{ bg: '#9F7AEA', color: 'white' }}>
                    <Box as="span" flex='1' textAlign='left'>
                      {pizza.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Heading>
                <AccordionPanel pb={4}>
                  {pizza.toppings.map(topping => <Box>{topping.name}</Box>)}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>
      </Center>
      {isCreatingPizza &&
        <PizzaCreationForm
          close={handleClosePizzaCreationForm}
          trigger={trigger} />}
      <HStack mt={10} justify="center">
        <Button colorScheme="teal" size="lg" onClick={handleCreationClick}>
          Create
        </Button>
        <Button colorScheme="red" size="lg" mr={2} >
          Delete
        </Button>
        <Button colorScheme="blue" size="lg" >
          Update
        </Button>
      </HStack>
    </>
  );
}
