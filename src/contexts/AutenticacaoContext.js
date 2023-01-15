import { createContext, useState } from 'react';

export const AutenticacaoContext = createContext({});

export function AutenticacaoProvider({ children }) {

  const [usuario, setUsuario] = useState({});

  const login = (email, senha) => {
    if (email === 'filipi@email.com' && senha === '123') {
      setUsuario({
        nome: 'Filipi',
        email: email,
        endereco: 'Av. Paulista',
        telefone: '11 949201199'
      });
      return 'OK'
    } else {
      return 'E-mail ou senha incorretos';
    }
  }

  return (
    <AutenticacaoContext.Provider
      value={{
        usuario,
        login
      }}
    >
      {children}
    </AutenticacaoContext.Provider>
  )
}