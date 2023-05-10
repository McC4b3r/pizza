'use client'

import { Heading, HStack, Button } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js'

export default function Home() {
  return (
    <div>
      <Heading as="h1" size="xl" textAlign="center" mt={10}>
        Welcome to StrongMind Pizza Co.
      </Heading>
      <HStack mt={20} justify="center">
        <Link href="/toppings">
          <Button colorScheme="teal" size="lg">
            Manage Toppings
          </Button>
        </Link>
        <Button colorScheme="teal" size="lg">
          Manage Pizzas
        </Button>
      </HStack>
    </div>
  )
}
