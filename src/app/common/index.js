/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  AlertTitle,
  AlertDescription,
  Text,
  AlertIcon,
} from '@chakra-ui/react';

export function DualAlert({
  isTopping,
  isPizza,
}) {
  return (
    <Alert
      mt={36}
      borderRadius="lg"
      status="info"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {(isTopping && <Text>No Toppings Yet!</Text>)
          || (isPizza && <Text>No Pizzas Yet!</Text>)}
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        {(isTopping && <Text>Click the Add button to add some Toppings</Text>)
          || (isPizza && <Text>Click the Create button to make a master piece</Text>)}
      </AlertDescription>
    </Alert>
  );
}

DualAlert.propTypes = {
  isTopping: PropTypes.bool.isRequired,
  isPizza: PropTypes.bool.isRequired,
};
