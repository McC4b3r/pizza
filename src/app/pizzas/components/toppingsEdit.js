import {
  Box,
  Center,
  Spinner,
  Text,
  Heading,
} from '@chakra-ui/react'
import { getAllToppings } from '../../toppings/queries';

export const ToppingsEdit = () => {
  const [updatedPizzaToppings, setUpdatedPizzaToppings] = useState([]);
  const { toppings, isLoading, isError, trigger } = getAllToppings();

  if (isError) return <div>failed to load</div>
  if (isLoading) return <Center><Spinner mt={12} /></Center>

  const isDuplicateName = pizzasData.data.some((pizza) => pizza.name.toLowerCase() === pizzaName.toLowerCase());

  const handleToppingsChangeSubmit = () => {
    if (updatedPizzaToppings.length > 0 && !isDuplicateName) {
      updatePizzaName(selectedPizza, updatedPizzaName)
      trigger()
      setUpdatedPizzaName('');
      setSelectedPizza('');
      setIsUpdatingName(false);
    }
  }

  return (
    <Box>
      <Heading mb={2} size="sm">
        Available
      </Heading>
      {toppings.data.map((topping, i) => {
        return (
          <Text key={i}>{topping.name}</Text>
        )
      })}
    </Box>
  )
}