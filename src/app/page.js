'use client';

import React from 'react';
import { Heading, HStack, Button } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

export default function Home() {
  return (
    <div>
      <Heading as="h1" size="xl" textAlign="center" mt={10}>
        Welcome to caberTek Pizza Co.
      </Heading>
      <HStack mt={20} justify="center">
        <Link href="/toppings">
          <Button colorScheme="teal" size="lg">
            Manage Toppings
          </Button>
        </Link>
        <Link href="/pizzas">
          <Button colorScheme="teal" size="lg">
            Manage Pizzas
          </Button>
        </Link>
      </HStack>
    </div>
  );
}
