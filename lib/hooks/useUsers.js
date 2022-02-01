import { useState, useEffect, useContext } from 'react'
import { useCabal } from './useCabal'

export function useUsers() {
  const { currentCabal } = useCabal()
  const [users, setUsers] = useState()

  useEffect(() => {
    if (currentCabal) {
      const userList = currentCabal.getUsers()
      setUsers(userList)

      currentCabal.on('started-peering', (key, name) => {
        setUsers(currentCabal.getUsers())
      })

      currentCabal.on('stopped-peering', (key, name) => {
        setUsers(currentCabal.getUsers())
      })
    }
  }, [currentCabal])

  return {
    users,
  }
}
