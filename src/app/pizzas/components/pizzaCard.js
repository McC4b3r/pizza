import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  Flex,
  Heading,
  Divider,
  Center,
  ButtonGroup,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  Spacer,
} from "@chakra-ui/react";
import {
  CheckIcon,
  CloseIcon,
} from "@chakra-ui/icons"
import { ToppingsEdit } from './toppingsEdit';
import { UpdateFormInput } from './updateFormInput';

export const PizzaCard = ({
  selectedPizza,
  pizza,
  isUpdatingName,
  isUpdatingToppings,
  isupdatingEither,
  handlePizzaClick,
  isDuplicateUpdateName,
  handleNameChangeSubmit,
  handleToppingsChangeSubmit,
  handleUpdateToppingsCancel,
  updatedPizzaName,
  updatedPizzaToppings,
  setUpdatedPizzaToppings,
  handleUpdatePizzaNameChange,
  handleUpdateNameCancel,
  isDuplicateToppings,
  updateRef,
}) => {
  return (
    <Card
      data-testid="pizza-card"
      textAlign="center"
      bg={selectedPizza === pizza.id ? 'red.100' : 'red.50'}
      _hover={{
        cursor: isupdatingEither ? null : 'pointer',
        bg: 'red.100',
      }}
      onClick={() => handlePizzaClick(pizza.id)}
      key={pizza.id}
    >
      <CardHeader>
        {selectedPizza === pizza.id && isUpdatingName ? (
          <UpdateFormInput
            isDuplicate={isDuplicateUpdateName}
            submit={handleNameChangeSubmit}
            pizza={pizza}
            updatedPizzaName={updatedPizzaName}
            handleChange={handleUpdatePizzaNameChange}
            handleCancel={handleUpdateNameCancel}
            updateRef={updateRef}
          />
        ) : (
          <Box as="span" flex="1">
            <Heading textAlign="center" size="sm">
              {pizza.name}
            </Heading>
          </Box>
        )}
      </CardHeader>
      <Center>
        <Divider borderColor="gray.300" width="75%" />
      </Center>
      <CardBody pb={2}>
        <Flex justifyContent="space-around">
          <Box>
            {selectedPizza === pizza.id && isUpdatingToppings && (
              <Heading mb={2} size="sm">
                Existing
              </Heading>
            )}
            {pizza.toppings.map((topping) => (
              <Box
                data-testid="existing-toppings"
                my={1}
                key={topping.id}
                fontStyle="italic"
              >
                {topping.name}
              </Box>
            ))}
          </Box>
          {selectedPizza === pizza.id && isUpdatingToppings && (
            <Box>
              <Spacer />
              <Box>
                <ToppingsEdit
                  updatedPizzaToppings={updatedPizzaToppings}
                  setUpdatedPizzaToppings={setUpdatedPizzaToppings}
                />
              </Box>
            </Box>
          )}
        </Flex>
      </CardBody>
      {selectedPizza === pizza.id && isUpdatingToppings && (
        <Center>
          <ButtonGroup my={4}>
            <Button
              data-testid="update-toppings-submit-button"
              isDisabled={
                isDuplicateToppings || !updatedPizzaToppings.length
              }
              size="sm"
              colorScheme="teal"
              onClick={() => handleToppingsChangeSubmit(pizza.id)}
            >
              <CheckIcon />
            </Button>
            <Button
              onClick={handleUpdateToppingsCancel}
              size="sm"
              colorScheme="red"
            >
              <CloseIcon />
            </Button>
          </ButtonGroup>
        </Center>
      )}
      <CardFooter padding={0}>
        {isDuplicateToppings && selectedPizza === pizza.id && (
          <Alert
            borderRadius="md"
            size="sm"
            variant="solid"
            status="error"
          >
            <AlertIcon size="sm" />
            <AlertTitle fontSize="xs">
              A pizza with those toppings already exists
            </AlertTitle>
          </Alert>
        )}
      </CardFooter>
    </Card>
  )
}