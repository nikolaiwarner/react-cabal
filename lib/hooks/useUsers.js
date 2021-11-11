import { useState, useEffect, useContext } from 'react';
import { CabalContext } from '../CabalProvider';
import { useCabal } from './useCabal';

export function useUsers() {
  const client = useContext(CabalContext);
  const { currentCabal } = useCabal();
  const [users, setUsers] = useState();

  useEffect(() => {
    if (!client) return;
    const userList = client.getUsers();
    setUsers(userList);
  }, [client, currentCabal]);

  return {
    users,
  };
}
