'use client'

import { useState } from 'react';
import { handleEnter, isDupeName } from '../helpers';
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
import {
  createTopping,
  getAllToppings,
  updateTopping,
  deleteTopping,
} from './queries'
import { ArrowBackIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { DualAlert } from '../common';

export default function Toppings() {
  const [selectedTopping, setSelectedTopping] = useState('');
  const [isAddingTopping, setIsAddingTopping] = useState(false);
  const [isUpdatingTopping, setIsUpdatingTopping] = useState(false);
  const [addToppingName, setAddToppingName] = useState('');
  const [updatedToppingName, setUpdatedToppingName] = useState('');

  // query
  const { toppings, isLoading, isError, trigger } = getAllToppings();

  if (isError) return <div>failed to load</div>
  if (isLoading) return <Center><Spinner mt={12} /></Center>

  // select topping within list
  const handleToppingClick = (toppingId) => {
    if (!isUpdatingTopping) {
      if (selectedTopping === toppingId) {
        setSelectedTopping('')
      } else {
        setSelectedTopping(toppingId);
      }
    }
  };

  const isAddButtonDisabled = !!selectedTopping

  const handleAddButtonClick = (event) => {
    setIsAddingTopping(true);
  };

  const handleCancelAddTopping = () => {
    setIsAddingTopping(false);
  }

  // gather name of new topping
  const handleToppingNameChange = (event) => {
    setAddToppingName(event.target.value);
  };


  // submit new topping
  const handleAddToppingSubmit = () => {
    if (addToppingName.trim() !== '' && !isDuplicateToppingName) {
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
  }

  // submit updated topping
  const handleUpdateTopping = () => {
    if (updatedToppingName.trim() !== '' && !isDuplicateToppingName) {
      updateTopping(selectedTopping, updatedToppingName)
      trigger()
      setUpdatedToppingName('');
      setSelectedTopping('');
      setIsUpdatingTopping(false);
    }
  };

  const handleUpdateCancel = () => {
    setIsUpdatingTopping(false);
  }

  const handleEnterKey = (event) => handleEnter(event, isAddingTopping, handleAddToppingSubmit, handleUpdateTopping)

  // check for duplicate toppings
  const isDuplicateToppingName = isDupeName(toppings, addToppingName);

  return (
    <>
      <Link href='/'>
        <Button colorScheme='teal' leftIcon={<ArrowBackIcon />} mt={2} ml={2} size="sm" variant="ghost" >
          Home
        </Button>
      </Link>
      <Heading as="h1" size="xl" textAlign="center" mt={10}>
        Toppings
      </Heading>
      <Box>
        {!toppings.data.length && <DualAlert isTopping />}
        <Grid mt={20} templateColumns='repeat(2, 1fr)' gap={4} mx="auto" maxW="xl">
          {toppings.data.map((topping) => (
            <Card
              bg={selectedTopping === topping.id ? 'blue.100' : 'blue.50'}
              _hover={{ cursor: 'pointer', bg: 'blue.100' }}
              onClick={() => handleToppingClick(topping.id)}
              key={topping.id}
            >
              <CardBody>
                {selectedTopping === topping.id && isUpdatingTopping ? (
                  <FormControl isInvalid={isDuplicateToppingName}>
                    <InputGroup>
                      <Input
                        focusBorderColor={isDuplicateToppingName ? 'red.500' : 'blue.500'}
                        placeholder={topping.name}
                        value={updatedToppingName}
                        onChange={handleUpdateToppingNameChange}
                        onKeyDown={handleEnterKey}
                        bg="gray.50"
                      />
                      <InputRightElement>
                        <ButtonGroup ml="-36px" spacing='4px'>
                          <Button
                            colorScheme="teal"
                            h='1.75rem'
                            size='xs'
                            isDisabled={!updatedToppingName}
                            onClick={handleUpdateTopping}>
                            <CheckIcon />
                          </Button>
                          <Button colorScheme="red" h='1.75rem' size='xs' onClick={handleUpdateCancel}>
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
          <FormControl isInvalid={isDuplicateToppingName}>
            <Center>
              <VStack>
                <Input
                  id="addInput"
                  width="250px"
                  placeholder="Enter new topping name"
                  value={addToppingName}
                  onChange={handleToppingNameChange}
                  onKeyDown={handleEnterKey}
                />
                {
                  isDuplicateToppingName &&
                  <FormErrorMessage>
                    That topping already exists
                  </FormErrorMessage>
                }
              </VStack>
            </Center>
            <Center mt={2}>
              <Button colorScheme="teal" size="sm" ml={2} onClick={handleAddToppingSubmit} isDisabled={isDuplicateToppingName}>
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
