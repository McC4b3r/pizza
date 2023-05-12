import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import axios from 'axios';

const getAll = route => axios.get(route).then(res => res.data)
export const createTopping = (name) => axios.post(`/toppings/api/${name}`).then(res => res.data);

export const getAllToppings = () => {
    const { data, error, isLoading } = useSWR('/toppings/api', getAll)
    const { trigger } = useSWRMutation('/toppings/api', getAll);
   
    return {
      toppings: data,
      isLoading,
      isError: error,
      trigger,
    }
  };
