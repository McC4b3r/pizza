'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Heading,
  Button,
  HStack,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Center,
  FormControl,
  FormErrorMessage,
  VStack,
  Spinner,
  Link,
  ButtonGroup,
  Card,
  CardBody,
  Grid,
} from '@chakra-ui/react';
import { ArrowBackIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { handleEnter, isDupeName } from '../helpers';
import {
  createTopping,
  useGetAllToppings,
  updateTopping,
  deleteTopping,
} from './queries';
import { DualAlert } from '../common';

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
  if (isLoading) return <Center><Spinner mt={12} /></Center>;

  // select topping within list
  const handleToppingClick = (toppingId) => {
    if (!isUpdatingTopping) {
      if (selectedTopping === toppingId) {
        setSelectedTopping('');
      } else {
        setSelectedTopping(toppingId);
      }
    }
  };

  const isAddButtonDisabled = !!selectedTopping;

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

  const handleEnterKey = (event) => (
    handleEnter(event, isAddingTopping, handleAddToppingSubmit, handleUpdateTopping)
  );

  return (
    <>
      <Link href="/">
        <Button colorScheme="teal" leftIcon={<ArrowBackIcon />} mt={2} ml={2} size="sm" variant="ghost">
          Home
        </Button>
      </Link>
      <Heading as="h1" size="xl" textAlign="center" mt={10}>
        Toppings
      </Heading>
      <Box>
        {!toppings.data.length && <DualAlert isTopping />}
        <Grid mt={20} templateColumns="repeat(2, 1fr)" gap={4} mx="auto" maxW="xl">
          {toppings.data.map((topping) => (
            <Card
              bg={selectedTopping === topping.id ? 'blue.100' : 'blue.50'}
              _hover={{ cursor: 'pointer', bg: 'blue.100' }}
              onClick={() => handleToppingClick(topping.id)}
              key={topping.id}
            >
              <CardBody>
                {selectedTopping === topping.id && isUpdatingTopping ? (
                  <FormControl isInvalid={isDuplicateUpdateToppingName}>
                    <InputGroup>
                      <VStack flex={1}>
                        <Input
                          focusBorderColor={isDuplicateUpdateToppingName ? 'red.500' : 'blue.500'}
                          placeholder={topping.name}
                          value={updatedToppingName}
                          onChange={handleUpdateToppingNameChange}
                          onKeyDown={handleEnterKey}
                          ref={updateRef}
                          bg="gray.50"
                        />
                        {isDuplicateUpdateToppingName && (
                          <FormErrorMessage>
                            That topping already exists.
                          </FormErrorMessage>
                        )}
                      </VStack>
                      <InputRightElement>
                        <ButtonGroup ml="-36px" spacing="4px">
                          <Button
                            colorScheme="teal"
                            h="1.75rem"
                            size="xs"
                            isDisabled={!updatedToppingName || isDuplicateUpdateToppingName}
                            onClick={handleUpdateTopping}
                          >
                            <CheckIcon />
                          </Button>
                          <Button colorScheme="red" h="1.75rem" size="xs" onClick={handleUpdateCancel}>
                            <CloseIcon />
                          </Button>
                        </ButtonGroup>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                ) : (
                  topping.name
                )}
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Box>
      {isAddingTopping && (
        <Box mt={6}>
          <FormControl isInvalid={isDuplicateAddToppingName}>
            <Center>
              <VStack>
                <Input
                  id="addInput"
                  width="250px"
                  placeholder="Enter new topping name"
                  value={addToppingName}
                  onChange={handleToppingNameChange}
                  onKeyDown={handleEnterKey}
                  ref={addRef}
                />
                {
                  isDuplicateAddToppingName
                  && (
                    <FormErrorMessage>
                      That topping already exists
                    </FormErrorMessage>
                  )
                }
              </VStack>
            </Center>
            <Center mt={2}>
              <Button
                colorScheme="teal"
                size="sm"
                ml={2}
                onClick={handleAddToppingSubmit}
                isDisabled={isDuplicateAddToppingName || !addToppingName}
              >
                Ok
              </Button>
              <Button colorScheme="red" size="sm" ml={2} onClick={handleCancelAddTopping}>
                Cancel
              </Button>
            </Center>
          </FormControl>
        </Box>
      )}
      <HStack mt={10} justify="center">
        <Button colorScheme="teal" size="lg" isDisabled={isAddButtonDisabled} onClick={handleAddButtonClick}>
          Add
        </Button>
        <Button colorScheme="red" size="lg" mr={2} onClick={handleDeleteTopping} isDisabled={!selectedTopping}>
          Delete
        </Button>
        <Button colorScheme="blue" size="lg" onClick={handleUpdateButtonClick} isDisabled={!selectedTopping}>
          Update
        </Button>
      </HStack>
    </>
  );
}
