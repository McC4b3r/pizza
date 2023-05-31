import {
  Box,
  Grid,
} from "@chakra-ui/react"
import { DualAlert } from '../../common/index'
import { ToppingCard } from "./toppingCard"

export const ToppingsGrid = ({
  toppings,
  selectedTopping,
  handleToppingClick,
  isUpdatingTopping,
  isDuplicateUpdateToppingName,
  updatedToppingName,
  handleUpdateToppingNameChange,
  handleEnterKey,
  updateRef,
  handleUpdateTopping,
  handleUpdateCancel,
}) => {
  return (
    <Box data-testid="toppingContainer">
      {!toppings.data.length &&
        <Box
          mr="auto"
          ml="auto"
          w="container.md"
        >
          <DualAlert isTopping />
        </Box>
      }
      <Grid
        mt={20}
        templateColumns="repeat(2, 1fr)"
        gap={4}
        mx="auto"
        maxW="xl"
      >
        {toppings.data.map((topping) => (
          <ToppingCard
            topping={topping}
            selectedTopping={selectedTopping}
            handleToppingClick={handleToppingClick}
            isUpdatingTopping={isUpdatingTopping}
            isDuplicateUpdateToppingName={isDuplicateUpdateToppingName}
            updatedToppingName={updatedToppingName}
            handleUpdateToppingNameChange={handleUpdateToppingNameChange}
            handleEnterKey={handleEnterKey}
            updateRef={updateRef}
            handleUpdateTopping={handleUpdateTopping}
            handleUpdateCancel={handleUpdateCancel}
          />
        ))}
      </Grid>
    </Box>
  )
}