import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import axios from 'axios';

const ROUTE_NAME = '/api/pizzas';

const getAll = route => axios.get(route).then(res => res.data)

export const getPizzas = () => {
  const {
    data,
    error,
    isLoading
  } = useSWR(ROUTE_NAME, getAll)

  const { trigger } = useSWRMutation(ROUTE_NAME, getAll);

  return {
    data,
    isLoading,
    error,
    trigger,
  }
};

export const createPizza = (data) => {
  axios.post(ROUTE_NAME, { data }).then(res => res.data)
}

export const updatePizzaName = (id, updatedPizzaName) => {
  axios.put(ROUTE_NAME, {
    id,
    name: updatedPizzaName,
  })
    .then(res => res.data)
    .catch(e => console.log(e))
}