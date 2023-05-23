import { useFetchUsersQuery } from '../store'

const fetchUser = () => {
    const {data, isLoading, error} = useFetchUsersQuery()

    let clientName;

    if (isLoading) {
        clientName = "loading";
     } else if (error) {
        clientName = "error";
     } else {
        clientName = data;
     }

  return clientName
}

export default fetchUser;


