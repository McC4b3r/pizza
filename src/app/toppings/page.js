'use client'

import { useState } from 'react';
import {
  Heading,
  UnorderedList,
  ListItem,
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
  ButtonGroup
} from '@chakra-ui/react';
import {
  createTopping,
  getAllToppings,
  updateTopping,
  deleteTopping,
} from './queries'
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function Toppings() {
  const [selectedTopping, setSelectedTopping] = useState('');
  const [isAddingTopping, setIsAddingTopping] = useState(false);
  const [isUpdatingTopping, setIsUpdatingTopping] = useState(false);
  const [addToppingName, setAddToppingName] = useState('');
  const [updatedToppingName, setUpdatedToppingName] = useState('');

  // query
  const { toppings, isLoading, isError, trigger } = getAllToppings();

  if (isError) return <div>failed to load</div>
  if (isLoading) return <Center><Spinner /></Center>

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
    if (addToppingName.trim() !== '' && !isDuplicate) {
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
    if (updatedToppingName.trim() !== '' && !isDuplicate) {
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

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      isAddingTopping ? handleAddToppingSubmit() : handleUpdateTopping();
    }
  }

  // check for duplicate toppings
  const isDuplicate = toppings.data.some((topping) => (
    topping.name.toLowerCase() === addToppingName.toLowerCase() || topping.name.toLowerCase() === updatedToppingName.toLowerCase()
  )
  );

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
      <UnorderedList mt={20} spacing={3} mx="auto" maxW="md">
        {toppings.data.map((topping) => (
          <ListItem
            key={topping.id}
            bg={selectedTopping === topping.id ? 'gray.100' : ''}
            _hover={{ cursor: 'pointer', bg: 'gray.50' }}
            onClick={() => handleToppingClick(topping.id)}
          >
            {selectedTopping === topping.id && isUpdatingTopping ? (
              <FormControl isInvalid={isDuplicate}>
                <InputGroup>
                  <Input
                    focusBorderColor={isDuplicate ? 'red.500' : 'blue.500'}
                    placeholder={topping.name}
                    value={updatedToppingName}
                    onChange={handleUpdateToppingNameChange}
                    onKeyDown={handleEnter}
                  />
                  <InputRightElement>
                    <ButtonGroup ml="-100px" spacing='8px'>
                      <Button colorScheme="teal" h='1.75rem' size='sm' onClick={handleUpdateTopping}>
                        Ok
                      </Button>
                      <Button colorScheme="red" h='1.75rem' size='sm' onClick={handleUpdateCancel}>
                        Cancel
                      </Button>
                    </ButtonGroup>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            ) : (
              topping.name
            )}
          </ListItem>
        ))}
      </UnorderedList>
      {isAddingTopping && (
        <Box mt={6}>
          <FormControl isInvalid={isDuplicate}>
            <Center>
              <VStack>
                <Input
                  id="addInput"
                  width="250px"
                  placeholder="Enter new topping name"
                  value={addToppingName}
                  onChange={handleToppingNameChange}
                  onKeyDown={handleEnter}
                />
                {
                  isDuplicate &&
                  <FormErrorMessage>
                    That topping already exists
                  </FormErrorMessage>
                }
              </VStack>
            </Center>
            <Center mt={2}>
              <Button colorScheme="teal" size="sm" ml={2} onClick={handleAddToppingSubmit} isDisabled={isDuplicate}>
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
