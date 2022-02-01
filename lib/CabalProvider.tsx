import Client from '../web/cabal-client-bundle'
import React, { useEffect, useState } from 'react'

export function createCabalClient(dbdir = `/tmp/.cabal-desktop/v2`) {
  const client = new Client({
    config: {
      dbdir,
    },
  })

  return client
}

export const CabalContext = React.createContext<any>(null)

export function CabalProvider({ children, initCabal, dbdir }: any) {
  const [client, setClient] = useState()

  async function initializeCabals() {
    const cabalClient = createCabalClient(dbdir)
    if (initCabal) {
      try {
        await cabalClient.addCabal(initCabal)
        setClient(cabalClient)
      } catch (e) {
        console.log('error is', e)
      }
    }
  }
  useEffect(() => {
    initializeCabals()
  }, [])

  return <CabalContext.Provider value={client}>{children}</CabalContext.Provider>
}
