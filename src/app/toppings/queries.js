import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import axios from 'axios';

const getAll = route => axios.get(route).then(res => res.data)

export const createTopping = (name) => axios.post('/api/toppings/', {name}).then(res => res.data);

export const getAllToppings = () => {
    const { data, error, isLoading } = useSWR('/api/toppings', getAll)
    const { trigger } = useSWRMutation('/api/toppings', getAll);
   
    return {
      toppings: data,
      isLoading,
      isError: error,
      trigger,
    }
  };

  export const deleteTopping = async (ids) => {
    axios({
      method: 'post',
      url: '/api/toppings',
      headers: {
        'x-http-method-override': 'DELETE',
        'Content-Type': 'application/json'
      },
      data: { ids }
    })
      .then(res => console.log(res))
      .catch(e => console.log(e))
  }
