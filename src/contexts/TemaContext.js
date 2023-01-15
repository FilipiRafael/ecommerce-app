import { createContext, useState, useEffect } from 'react';
import { claro, escuro } from '../estilosGlobais';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TemaContext = createContext({});

export function TemaProvider({ children }) {

  const [temaAtual, setTemaAtual] = useState('claro');
  const temas = {
    'escuro': escuro,
    'claro': claro
  };

  async function salvarTemaNoDispositivo(tema) {
    await AsyncStorage.setItem('@tema', tema);
    setTemaAtual(tema);
  }

  useEffect(() => {
    async function getTemaSalvo() {
      const temaSalvo = await AsyncStorage.getItem('@tema');
      if (temaSalvo) setTemaAtual(temaSalvo);
    }

    getTemaSalvo();
  }, []);

  return (
    <TemaContext.Provider
      value={{
        temaAtual,
        setTemaAtual,
        temaEscolhido: temas[temaAtual],
        salvarTemaNoDispositivo
      }}
    >
      {children}
    </TemaContext.Provider>
  )
}