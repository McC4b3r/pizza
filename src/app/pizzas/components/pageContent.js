import {
  Center,
  VStack,
  Heading,
  Box,
  Grid,
} from "@chakra-ui/react";
import { isToppingsEqual } from "../../helpers";
import { DualAlert } from "../../common";
import { PizzaCard } from './pizzaCard'


export const PageContent = ({
  pizzasData,
  selectedPizza,
  isupdatingEither,
  handlePizzaClick,
  isUpdatingName,
  isUpdatingToppings,
  isDuplicateUpdateName,
  handleNameChangeSubmit,
  updatedPizzaName,
  handleUpdatePizzaNameChange,
  handleUpdateNameCancel,
  handleUpdateToppingsCancel,
  updateRef,
  handleToppingsChangeSubmit,
  updatedPizzaToppings,
  setUpdatedPizzaToppings,
}) => {
  const isDuplicateToppings = isToppingsEqual(
    pizzasData.data,
    updatedPizzaToppings,
  );

  return (
    <Center mt={10}>
      <VStack>
        <Heading size="md" textAlign="center" mb={4}>
          Signature Pies
        </Heading>
        <Box
          data-testid="main-pizzas-section"
          borderRadius="lg"
          bg="blue.50"
          overflowY="scroll"
          height="570px"
          width="768px"
          p="8"
        >
          {!pizzasData.data.length && <DualAlert isPizza />}
          <Grid order="initial" templateColumns="repeat(2, 1fr)" gap={4}>
            {pizzasData.data.map((pizza) => (
              <PizzaCard
                pizza={pizza}
                selectedPizza={selectedPizza}
                isUpdatingName={isUpdatingName}
                isUpdatingToppings={isUpdatingToppings}
                isupdatingEither={isupdatingEither}
                handlePizzaClick={handlePizzaClick}
                isDuplicateUpdateName={isDuplicateUpdateName}
                handleNameChangeSubmit={handleNameChangeSubmit}
                handleToppingsChangeSubmit={handleToppingsChangeSubmit}
                handleUpdateToppingsCancel={handleUpdateToppingsCancel}
                updatedPizzaName={updatedPizzaName}
                updatedPizzaToppings={updatedPizzaToppings}
                setUpdatedPizzaToppings={setUpdatedPizzaToppings}
                handleUpdatePizzaNameChange={handleUpdatePizzaNameChange}
                handleUpdateNameCancel={handleUpdateNameCancel}
                isDuplicateToppings={isDuplicateToppings}
                updateRef={updateRef}
              />
            ))}
          </Grid>
        </Box>
      </VStack>
    </Center>
  )
}
