'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Heading,
  Button,
  Box,
  Center,
  Spinner,
  Link,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { handleEnter, isDupeName } from '../helpers';
import {
  createTopping,
  useGetAllToppings,
  updateTopping,
  deleteTopping,
} from './queries';
import {
  ToppingsGrid,
  CreationInputForm,
  CrudButtons
} from './components';

export default function Toppings() {
  const [selectedTopping, setSelectedTopping] = useState('');
  const [isAddingTopping, setIsAddingTopping] = useState(false);
  const [isUpdatingTopping, setIsUpdatingTopping] = useState(false);
  const [addToppingName, setAddToppingName] = useState('');
  const [updatedToppingName, setUpdatedToppingName] = useState('');
  const updateRef = useRef(null);
  const addRef = useRef(null);

  useEffect(() => {
    if (isUpdatingTopping && updateRef.current) {
      updateRef.current.focus();
    }
    if (isAddingTopping && addRef.current) {
      addRef.current.focus();
    }
  }, [isUpdatingTopping, isAddingTopping]);

  // query
  const {
    toppings, isLoading, isError, trigger,
  } = useGetAllToppings();

  if (isError) return <div>failed to load</div>;
  if (isLoading) {
    return (
      <Center>
        <Spinner mt={12} />
      </Center>
    );
  }

  // select topping within list
  const handleToppingClick = (toppingId) => {
    !isUpdatingTopping && setSelectedTopping(selectedTopping === toppingId ? '' : toppingId);
  };

  const isAddButtonDisabled = !!selectedTopping || isAddingTopping;

  const handleAddButtonClick = () => {
    setIsAddingTopping(true);
  };

  const handleCancelAddTopping = () => {
    setIsAddingTopping(false);
  };

  // gather name of new topping
  const handleToppingNameChange = (event) => {
    setAddToppingName(event.target.value);
  };

  const isDuplicateAddToppingName = isDupeName(toppings, addToppingName);
  const isDuplicateUpdateToppingName = isDupeName(toppings, updatedToppingName);

  // submit new topping
  const handleAddToppingSubmit = () => {
    if (addToppingName.trim() !== '' && !isDuplicateAddToppingName) {
      createTopping(addToppingName);
      // trigger re-validates the swr cache
      trigger();
      setAddToppingName('');
      setIsAddingTopping(false);
    }
  };

  // allow topping name to be updated
  const handleUpdateButtonClick = () => {
    setIsUpdatingTopping(true);
  };

  // gather name of updated topping
  const handleUpdateToppingNameChange = (event) => {
    setUpdatedToppingName(event.target.value);
  };

  // delete a selected topping
  const handleDeleteTopping = () => {
    deleteTopping(selectedTopping);
    trigger();
    setSelectedTopping('');
  };

  // submit updated topping
  const handleUpdateTopping = () => {
    if (updatedToppingName.trim() !== '' && !isDuplicateUpdateToppingName) {
      updateTopping(selectedTopping, updatedToppingName);
      trigger();
      setUpdatedToppingName('');
      setSelectedTopping('');
      setIsUpdatingTopping(false);
    }
  };

  const handleUpdateCancel = () => {
    setUpdatedToppingName('');
    setIsUpdatingTopping(false);
  };

  const handleEnterKey = (event) => handleEnter(
    event,
    isAddingTopping,
    handleAddToppingSubmit,
    handleUpdateTopping,
  );

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
        Toppings
      </Heading>
      <ToppingsGrid
        toppings={toppings}
        selectedTopping={selectedTopping}
        handleToppingClick={handleToppingClick}
        isUpdatingTopping={isUpdatingTopping}
        isDuplicateUpdateToppingName={isDuplicateUpdateToppingName}
        updatedToppingName={updatedToppingName}
        handleUpdateToppingNameChange={handleUpdateToppingNameChange}
        handleEnterKey={handleEnterKey}
        updateRef={updateRef}
        handleUpdateTopping={handleUpdateTopping}
        handleUpdateCancel={handleUpdateCancel}
      />
      {isAddingTopping && (
        <CreationInputForm
          isDuplicateAddToppingName={isDuplicateAddToppingName}
          addToppingName={addToppingName}
          handleToppingNameChange={handleToppingNameChange}
          handleEnterKey={handleEnterKey}
          addRef={addRef}
          handleAddToppingSubmit={handleAddToppingSubmit}
          handleCancelAddTopping={handleCancelAddTopping}
        />
      )}
      <CrudButtons
        isAddButtonDisabled={isAddButtonDisabled}
        handleAddButtonClick={handleAddButtonClick}
        handleDeleteTopping={handleDeleteTopping}
        selectedTopping={selectedTopping}
        isUpdatingTopping={isUpdatingTopping}
        handleUpdateButtonClick={handleUpdateButtonClick}
      />
    </Box>
  );
}
