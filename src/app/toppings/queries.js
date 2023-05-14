import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import axios from 'axios';

const ROUTE_NAME = '/api/toppings';

const getAll = route => axios.get(route).then(res => res.data)

export const getAllToppings = () => {
  const { data, error, isLoading } = useSWR(ROUTE_NAME, getAll)
  const { trigger } = useSWRMutation(ROUTE_NAME, getAll);
  
  return {
    toppings: data,
    isLoading,
    isError: error,
    trigger,
  }
};

export const createTopping = (name) => (
  axios.post(ROUTE_NAME, {name})
  .then(res => res.data));

export const deleteTopping = async (ids) => {
  axios({
    method: 'post',
    url: ROUTE_NAME,
    headers: {
      'x-http-method-override': 'DELETE',
      'Content-Type': 'application/json'
    },
    data: { ids }
  })
    .then(res => console.log('Topping Deleted'))
    .catch(e => console.log(e))
}

export const updateTopping = (id, updatedName) => {
  axios.put(ROUTE_NAME, {
    id,
    name: updatedName
  })
  .then(res => res.data)
  .catch(e => console.log(e))
}
