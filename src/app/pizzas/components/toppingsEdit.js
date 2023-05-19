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

  const updatePizzaToppings = (topping) => {
    setUpdatedPizzaToppings(prevToppings => (
      prevToppings.some(prevTop => prevTop.id === topping.id)
        ? prevToppings.filter(prev => prev.id !== topping.id)
        : [...prevToppings, { id: topping.id }]
    ));
  };

  const checkTopping = (toppingId) => updatedPizzaToppings.some((topping) => topping.id === toppingId)

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
            bg={checkTopping(topping.id) ? 'blue.100' : null}
            _hover={{ cursor: 'pointer', bg: 'blue.100' }}
            onClick={() => updatePizzaToppings(topping)}
            key={i}>
            {topping.name}
          </Text>
        )
      })}
    </Box>
  )
}