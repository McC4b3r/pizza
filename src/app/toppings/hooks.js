import useSWR from 'swr'

const fetcher = route => fetch(route).then(res => res)

export const getAllToppings =  () => {
    const { data, error, isLoading } = useSWR('/toppings/api', fetcher)
   
    return {
      toppings: data,
      isLoading,
      isError: error
    }
  }