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
  Divider,
  Flex,
  Spacer,
  ButtonGroup,
  AbsoluteCenter,
} from '@chakra-ui/react';
import { ArrowBackIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { PizzaCreationForm } from './components/pizzaCreationForm'
import { getPizzas, updatePizzaName, updatePizzaToppings, deletePizza } from './queries';
import { isDupeName } from '../helpers';
import { UpdateFormInput } from './components/updateFormInput'
import { ToppingsEdit } from './components/toppingsEdit'

export default function Pizzas() {
  const [isCreatingPizza, setIsCreatingPizza] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState('');
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [isUpdatingToppings, setIsUpdatingToppings] = useState(false);
  const [pizzaName, setPizzaName] = useState('');
  const [updatedPizzaName, setUpdatedPizzaName] = useState('');
  const [updatedPizzaToppings, setUpdatedPizzaToppings] = useState([]);

  const handleCreationClick = () => setIsCreatingPizza(true);
  const handleClosePizzaCreationForm = () => setIsCreatingPizza(false);

  const handlePizzaClick = (pizzaId) => {
    if (!(isUpdatingName || isUpdatingToppings)) {
      setSelectedPizza(selectedPizza === pizzaId ? '' : pizzaId);
    }
  };

  const handleUpdateNameClick = (e) => {
    setIsUpdatingName(true)
  }

  const handleUpdateToppingsClick = () => {
    setIsUpdatingToppings(true);
  }

  const handleUpdatePizzaNameChange = (event) => {
    setUpdatedPizzaName(event.target.value);
  };


  const handleUpdateNameCancel = () => {
    setIsUpdatingName(false);
  }

  const handleUpdateToppingsCancel = () => {
    setUpdatedPizzaToppings([]);
    setIsUpdatingToppings(false);
  }

  const isupdatingEither = isUpdatingName || isUpdatingToppings

  const {
    data: pizzasData,
    isLoading,
    error,
    trigger,
  } = getPizzas();

  if (error) return <div>failed to load</div>
  if (isLoading) return <Center><Spinner mt={12} /></Center>

  const isDuplicateUpdateName = isDupeName(pizzasData, updatedPizzaName)

  const handleNameChangeSubmit = () => {
    if (updatedPizzaName.trim() !== '' && !isDuplicateUpdateName) {
      updatePizzaName(selectedPizza, updatedPizzaName)
      trigger()
      setUpdatedPizzaName('');
      setSelectedPizza('');
      setIsUpdatingName(false);
    }
  }

  const handleToppingsChangeSubmit = (pizzaId) => {
    if (!!updatedPizzaToppings.length) {
      updatePizzaToppings(pizzaId, updatedPizzaToppings)
      trigger()
      setUpdatedPizzaToppings([]);
      setIsUpdatingToppings(false);
    }
  }

  const handleDeletePizza = (pizzaId) => {
    deletePizza(pizzaId);
    setSelectedPizza('');
    trigger();
  }

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
      <Center mt={10} >
        <VStack>
          <Heading size="md" textAlign="center" mb={4}>
            Signature Pies
          </Heading>
          <Box borderRadius="lg" bg="blue.50" overflowY="scroll" height="570px" width="768px" p="8">
            <Grid templateColumns='repeat(2, 1fr)' gap={4} >
              {pizzasData.data.map((pizza) => (
                <Card
                  textAlign="center"
                  bg={selectedPizza === pizza.id ? 'red.100' : 'red.50'}
                  _hover={{ cursor: isupdatingEither ? null : 'pointer', bg: 'red.100' }}
                  onClick={() => handlePizzaClick(pizza.id)}
                  key={pizza.id}>
                  <CardHeader >
                    {selectedPizza === pizza.id && isUpdatingName ?
                      <UpdateFormInput
                        isDuplicate={isDuplicateUpdateName}
                        submit={handleNameChangeSubmit}
                        pizza={pizza}
                        updatedPizzaName={updatedPizzaName}
                        handleChange={handleUpdatePizzaNameChange}
                        handleEnter={handleEnter}
                        handleCancel={handleUpdateNameCancel}
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
                  <CardBody
                    pb={4}>
                    <Flex justifyContent="center">
                      <Box >
                        {selectedPizza === pizza.id && isUpdatingToppings && (
                          <Heading mb={2} size="sm">
                            Existing
                          </Heading>
                        )}
                        {pizza.toppings.map((topping, index) => (
                          <Box
                            my={1}
                            key={index}
                            fontStyle="italic" >
                            {topping.name}
                          </Box>
                        ))}
                      </Box>
                      {selectedPizza === pizza.id && isUpdatingToppings && (
                        <>
                          <Spacer />
                          <Box>
                            <ToppingsEdit
                              updatedPizzaToppings={updatedPizzaToppings}
                              setUpdatedPizzaToppings={setUpdatedPizzaToppings} />
                          </Box>
                        </>
                      )}
                    </Flex>
                  </CardBody>
                  {selectedPizza === pizza.id && isUpdatingToppings && (
                    <Center>
                      <ButtonGroup my={4}>
                        <Button size="sm" colorScheme='teal'>
                          <CheckIcon onClick={() => handleToppingsChangeSubmit(pizza.id)} />
                        </Button >
                        <Button
                          onClick={handleUpdateToppingsCancel}
                          size="sm"
                          colorScheme='red'>
                          <CloseIcon />
                        </Button>
                      </ButtonGroup>
                    </Center>
                  )}
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
          isDisabled={!selectedPizza}
          onClick={() => handleDeletePizza(selectedPizza)}>
          Delete
        </Button>
        <Button
          colorScheme="blue"
          size="lg"
          onClick={handleUpdateNameClick}
          isDisabled={!selectedPizza}>
          Update Name
        </Button>
        <Button
          colorScheme="blue"
          size="lg"
          onClick={handleUpdateToppingsClick}
          isDisabled={!selectedPizza}>
          Update Toppings
        </Button>
      </HStack>
    </>
  );
}
