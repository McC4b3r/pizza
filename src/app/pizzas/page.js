'use client'

import { useState } from 'react';
import { handleEnter } from '../helpers'
import {
  Heading,
  Button,
  Link,
  Center,
  Spinner,
  Box,
  HStack,
  VStack,
  Grid,
  Card,
  CardHeader,
  CardBody,
  Divider
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { PizzaCreationForm } from './components/pizzaCreationForm'
import { getPizzas, updatePizzaName } from './queries';
import { UpdateFormInput } from './components/updateFormInput'

export default function Pizzas() {
  const [isCreatingPizza, setIsCreatingPizza] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedPizzaName, setUpdatedPizzaName] = useState('');
  const [pizzaName, setPizzaName] = useState('');

  const handleCreationClick = () => setIsCreatingPizza(true);
  const handleClosePizzaCreationForm = () => setIsCreatingPizza(false);

  const handlePizzaClick = (pizzaId) => {
    if (!isUpdating) {
      setSelectedPizza(selectedPizza === pizzaId ? '' : pizzaId);
    }
  };

  const handleUpdateClick = (e) => {
    setIsUpdating(true)
  }

  const handleUpdatePizzaNameChange = (event) => {
    setUpdatedPizzaName(event.target.value);
  };

  const handleNameChangeSubmit = () => {
    if (updatedPizzaName.trim() !== '' && !isDuplicateName) {
      updatePizzaName(selectedPizza, updatedPizzaName)
      trigger()
      setUpdatedPizzaName('');
      setSelectedPizza('');
      setIsUpdating(false);
    }
  }

  const handleUpdateCancel = () => {
    setIsUpdating(false);
  }

  const {
    data: pizzasData,
    isLoading,
    error,
    trigger,
  } = getPizzas();

  if (error) return <div>failed to load</div>
  if (isLoading) return <Center><Spinner mt={12} /></Center>

  const isDuplicateName = pizzasData.data.some((pizza) => pizza.name.toLowerCase() === pizzaName.toLowerCase());

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
          <Box borderRadius="lg" bg="blue.50" overflowY="scroll" height="512px" width="768px" p="8">
            <Grid templateColumns='repeat(2, 1fr)' gap={4} mx="auto" maxW="xl" >
              {pizzasData.data.map((pizza, index) => (
                <Card
                  textAlign="center"
                  bg={selectedPizza === pizza.id ? 'red.100' : 'red.50'}
                  _hover={{ cursor: 'pointer', bg: 'red.100' }}
                  onClick={() => handlePizzaClick(pizza.id)}
                  key={index}>
                  <CardHeader >
                    {selectedPizza === pizza.id && isUpdating ?
                      <UpdateFormInput
                        isDuplicate={isDuplicateName}
                        submit={handleNameChangeSubmit}
                        pizza={pizza}
                        updatedPizzaName={updatedPizzaName}
                        handleUpdatePizzaNameChange={handleUpdatePizzaNameChange}
                        handleEnter={handleEnter}
                        handleUpdateCancel={handleUpdateCancel}
                      />
                      :
                      <Box as="span" flex="1" >
                        <Heading textAlign="center" size="sm">
                          {pizza.name}
                        </Heading>
                      </Box>
                    }
                  </CardHeader>
                  <Center >
                    <Divider borderColor="gray.300" width="75%" />
                  </Center>
                  <CardBody pb={4}>
                    {pizza.toppings.map((topping, index) => (
                      <Box
                        key={index}
                        fontStyle="italic" >
                        {topping.name}
                      </Box>
                    ))}
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </Box>
        </VStack>
      </Center>
      {isCreatingPizza &&
        <PizzaCreationForm
          pizzasData={pizzasData}
          close={handleClosePizzaCreationForm}
          pizzaName={pizzaName}
          setPizzaName={setPizzaName}
          isDuplicateName={isDuplicateName}
          trigger={trigger} />}
      <HStack mt={10} justify="center">
        <Button
          colorScheme="teal"
          size="lg"
          onClick={handleCreationClick}
          isDisabled={selectedPizza || isCreatingPizza} >
          Create
        </Button>
        <Button
          colorScheme="red"
          size="lg"
          mr={2}
          isDisabled={!selectedPizza}>
          Delete
        </Button>
        <Button
          colorScheme="blue"
          size="lg"
          onClick={handleUpdateClick}
          isDisabled={!selectedPizza}>
          Update
        </Button>
      </HStack>
    </>
  );
}
