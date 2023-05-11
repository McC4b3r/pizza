'use client'

import { useEffect, useState } from 'react';
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
  FormHelperText,
  FormErrorMessage,
  VStack
} from '@chakra-ui/react';

export default function Toppings() {
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [isAddingTopping, setIsAddingTopping] = useState(false);
  const [isUpdatingTopping, setIsUpdatingTopping] = useState(false);
  const [newToppingName, setNewToppingName] = useState('');
  const [updatedToppingName, setUpdatedToppingName] = useState('');
  const [toppingList, setToppingList] = useState([]);

  useEffect(() => {
    // fetch data from the db
    fetch('/toppings/api')
    .then(response => response.json())
    .then(({data}) => {
      console.log({data});
      setToppingList(data)
    })
    .catch(error => console.error(error));
  }, [])
  
  // select topping within list
  const handleToppingClick = (toppingId) => {
    if (!isUpdatingTopping) {
      if (selectedToppings.includes(toppingId)) {
        setSelectedToppings((prevSelected) =>
          prevSelected.filter((topping) => topping !== toppingId)
        );
      } else {
        setSelectedToppings((prevSelected) => [...prevSelected, toppingId]);
      }
    }
  };

  const isAddButtonDisabled = selectedToppings.length > 0;

  const handleAddButtonClick = (event) => {
    setIsAddingTopping(true);
  };

  const handleCancelAddNewTopping = () => {
    setIsAddingTopping(false);
  }

  // gather name of new topping
  const handleToppingNameChange = (event) => {
    setNewToppingName(event.target.value);
  };

  const isDuplicate = toppingList.some((topping) => topping.name.toLowerCase() === newToppingName.toLowerCase());

  // submit new topping
  const handleToppingSubmit = () => {
    if (newToppingName.trim() !== '' && !isDuplicate) {
      const newToppingId = toppingList.length + 1;
      const newTopping = { id: newToppingId, name: newToppingName };
      setToppingList([...toppingList, newTopping])
      setNewToppingName('');
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
    console.log({breh: event.target.value})
  };

  // delete a selected topping
  const handleDeleteTopping = () => {
    setToppingList((prevToppings) => prevToppings.filter((topping) => !selectedToppings.includes(topping.id)));
    setSelectedToppings([]);
  }

  // submit updated topping
  const handleUpdateTopping = () => {
    if (selectedToppings.length === 1) {
      const toppingId = selectedToppings[0];
      const updatedToppingList = toppingList.map((topping) =>
        topping.id === toppingId ? { ...topping, name: updatedToppingName } : topping
      );
      setToppingList(updatedToppingList);
      setUpdatedToppingName('');
      setSelectedToppings([]);
      setIsUpdatingTopping(false);
    }
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      isAddingTopping ? handleToppingSubmit() : handleUpdateTopping();
    }
  }

  return (
    <div>
      <Heading as="h1" size="xl" textAlign="center" mt={10}>
        Toppings
      </Heading>
        <UnorderedList mt={20} spacing={3} mx="auto" maxW="md">
        {toppingList.map((topping) => (
          <ListItem
            key={topping.id}
            bg={selectedToppings.includes(topping.id) ? 'gray.100' : ''}
            _hover={{ cursor: 'pointer', bg: 'gray.50' }}
            onClick={() => handleToppingClick(topping.id)}
          >
            {selectedToppings.includes(topping.id) && isUpdatingTopping ? (
              <InputGroup>
                <Input
                  placeholder={topping.name}
                  value={updatedToppingName}
                  onChange={handleUpdateToppingNameChange}
                  onKeyDown={handleEnter}
                />
                <InputRightElement>
                  <Button colorScheme="teal" h='1.75rem' size='sm' mr={2} onClick={handleUpdateTopping}>
                    Ok
                  </Button>
                </InputRightElement>
              </InputGroup>
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
                  value={newToppingName}
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
              <Button colorScheme="teal" size="sm" ml={2} onClick={handleToppingSubmit}>
                Ok
              </Button>
              <Button colorScheme="red" size="sm" ml={2} onClick={handleCancelAddNewTopping}>
                Cancel
              </Button>
            </Center>
            </FormControl>
        </Box>
      )}
      <HStack mt={10} justify="center">
        <Button colorScheme="teal" size="lg" mr={2} isDisabled={isAddButtonDisabled} onClick={handleAddButtonClick}>
          Add
        </Button>
        <Button colorScheme="red" size="lg" mr={2} onClick={handleDeleteTopping} isDisabled={selectedToppings.length < 1}>
          Delete
        </Button>
        <Button colorScheme="blue" size="lg" onClick={handleUpdateButtonClick} isDisabled={selectedToppings.length < 1}>
          Update
        </Button>
      </HStack>
    </div>
  );
}
