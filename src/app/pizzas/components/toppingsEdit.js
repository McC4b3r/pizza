import { useState } from 'react';
import { getAllToppings } from '../../toppings/queries';
import { updatePizzaToppings } from '../queries';
import {
  Box,
  Center,
  Spinner,
  Text,
  Heading,
} from '@chakra-ui/react'


export const ToppingsEdit = ({
  updatedPizzaToppings,
  setUpdatedPizzaToppings,
}) => {
  const { toppings, isLoading, isError, trigger } = getAllToppings();

  if (isError) return <div>failed to load</div>
  if (isLoading) return <Center><Spinner mt={12} /></Center>

  const updatePizzaToppings = (toppingId) => {
    setUpdatedPizzaToppings(prevToppings => (
      prevToppings.includes(toppingId)
        ? prevToppings.filter(id => id !== toppingId)
        : [...prevToppings, toppingId]
    ));
  };

  return (
    <Box>
      <Heading mb={2} size="sm">
        Available
      </Heading>
      {toppings.data.map((topping, i) => {
        return (
          <Text
            my={1}
            borderRadius="md"
            bg={updatedPizzaToppings.includes(topping.id) ? 'blue.100' : null}
            _hover={{ cursor: 'pointer', bg: 'blue.100' }}
            onClick={() => updatePizzaToppings(topping.id)}
            key={i}>
            {topping.name}
          </Text>
        )
      })}
    </Box>
  )
}