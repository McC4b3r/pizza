'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Heading,
  Button,
  Link,
  Center,
  Spinner,
  Box,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { isDupeName } from '../helpers';
import { PizzaCreationForm } from './components/pizzaCreationForm';
import {
  useGetPizzas,
  updatePizzaName,
  updatePizzaToppings,
  deletePizza,
} from './queries';
import { PageContent } from './components/pageContent';
import { CrudButtons } from './components/crudButtons'

export default function Pizzas() {
  const [isCreatingPizza, setIsCreatingPizza] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState('');
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [isUpdatingToppings, setIsUpdatingToppings] = useState(false);
  const [pizzaName, setPizzaName] = useState('');
  const [updatedPizzaName, setUpdatedPizzaName] = useState('');
  const [updatedPizzaToppings, setUpdatedPizzaToppings] = useState([]);
  const updateRef = useRef(null);
  const addRef = useRef(null);

  useEffect(() => {
    if (isUpdatingName && updateRef.current) {
      updateRef.current.focus();
    }
  }, [isUpdatingName]);

  const handleCreationClick = () => setIsCreatingPizza(true);
  const handleClosePizzaCreationForm = () => setIsCreatingPizza(false);

  const handlePizzaClick = (pizzaId) => {
    if (!(isUpdatingName || isUpdatingToppings)) {
      setSelectedPizza(selectedPizza === pizzaId ? '' : pizzaId);
    }
  };

  const handleUpdateNameClick = () => {
    setIsUpdatingName(true);
  };

  const handleUpdateToppingsClick = () => {
    setIsUpdatingToppings(true);
  };

  const handleUpdatePizzaNameChange = (event) => {
    setUpdatedPizzaName(event.target.value);
  };

  const handleUpdateNameCancel = () => {
    setIsUpdatingName(false);
  };

  const handleUpdateToppingsCancel = () => {
    setUpdatedPizzaToppings([]);
    setIsUpdatingToppings(false);
  };

  const isupdatingEither = isUpdatingName || isUpdatingToppings;

  const {
    data: pizzasData, isLoading, error, trigger,
  } = useGetPizzas();

  if (error) return <div>failed to load</div>;
  if (isLoading) {
    return (
      <Center>
        <Spinner mt={12} />
      </Center>
    );
  }

  const isDuplicateUpdateName = isDupeName(pizzasData, updatedPizzaName);

  const handleNameChangeSubmit = () => {
    if (updatedPizzaName.trim() !== '' && !isDuplicateUpdateName) {
      updatePizzaName(selectedPizza, updatedPizzaName);
      setIsUpdatingToppings(false);
      trigger();
      setUpdatedPizzaName('');
      setSelectedPizza('');
      setIsUpdatingName(false);
    }
  };

  const handleToppingsChangeSubmit = (pizzaId) => {
    if (updatedPizzaToppings.length) {
      updatePizzaToppings(pizzaId, updatedPizzaToppings);
      trigger();
      setUpdatedPizzaName('');
      setUpdatedPizzaToppings([]);
      setIsUpdatingToppings(false);
    }
  };

  const handleDeletePizza = (pizzaId) => {
    deletePizza(pizzaId);
    setSelectedPizza('');
    trigger();
  };

  return (
    <Box>
      <Link href="/">
        <Button
          colorScheme="teal"
          leftIcon={<ArrowBackIcon />}
          mt={2}
          ml={2}
          size="sm"
          variant="ghost"
        >
          Home
        </Button>
      </Link>
      <Heading as="h1" size="xl" textAlign="center" mt={10}>
        Pizzas
      </Heading>
      <PageContent
        pizzasData={pizzasData}
        selectedPizza={selectedPizza}
        isupdatingEither={isupdatingEither}
        handlePizzaClick={handlePizzaClick}
        isUpdatingName={isUpdatingName}
        isUpdatingToppings={isUpdatingToppings}
        handleNameChangeSubmit={handleNameChangeSubmit}
        updatedPizzaName={updatedPizzaName}
        handleUpdatePizzaNameChange={handleUpdatePizzaNameChange}
        handleUpdateNameCancel={handleUpdateNameCancel}
        handleUpdateToppingsCancel={handleUpdateToppingsCancel}
        updateRef={updateRef}
        handleToppingsChangeSubmit={handleToppingsChangeSubmit}
        updatedPizzaToppings={updatedPizzaToppings}
        setUpdatedPizzaToppings={setUpdatedPizzaToppings}
      />
      {isCreatingPizza && (
        <Box data-testid="pizza-creation-form">
          <PizzaCreationForm
            isCreating={isCreatingPizza}
            pizzasData={pizzasData}
            close={handleClosePizzaCreationForm}
            pizzaName={pizzaName}
            setPizzaName={setPizzaName}
            trigger={trigger}
            addRef={addRef}
          />
        </Box>
      )}
      <CrudButtons
        handleCreationClick={handleCreationClick}
        selectedPizza={selectedPizza}
        handleDeletePizza={handleDeletePizza}
        isCreatingPizza={isCreatingPizza}
        isupdatingEither={isupdatingEither}
        handleUpdateNameClick={handleUpdateNameClick}
        handleUpdateToppingsClick={handleUpdateToppingsClick}
      />
    </Box>
  );
}
