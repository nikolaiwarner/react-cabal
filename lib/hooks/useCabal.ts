import { useContext, useState, useEffect } from 'react';
import { CabalContext } from '../CabalProvider';

export function useCabal() {
  const [cabals, setCabals] = useState<Array<any>>([]);
  const [currentCabal, setCurrentCabal] = useState<any>();

  const client = useContext(CabalContext);

  useEffect(() => {
    if (!client) return;
    const cabals = client.getCabalKeys();
    const cabal = client.getCurrentCabal();
    setCabals(cabals);
    setCurrentCabal(cabal);

    cabals.forEach((cabal) => {
      const selectedCabal = client.getDetails(cabal);
      selectedCabal.on('cabal-focus', (event: any) => {
        setCurrentCabal(client.getCurrentCabal());
      });
    });
  }, [client]);

  // add a new cabal
  function addCabal(key: string) {
    client.addCabal(key).then(() => {
      const cabals = client.getCabalKeys();
      setCabals(cabals);
    });
  }

  function focusCabal(key) {
    client?.focusCabal(key);
  }

  return {
    cabals,
    currentCabal,
    addCabal,
    focusCabal,
  };
}
