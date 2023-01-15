import { createContext, useState, useEffect } from 'react';
import { pegarProdutos, salvarProduto } from '../servicos/requisicoes/produtos';

export const ProdutosContext = createContext({});

export function ProdutosProvider({ children }) {

  const [quantidade, setQuantidade] = useState(0);
  const [carrinho, setCarrinho] = useState([]);
  const [ultimosVistos, setUltimosVistos] = useState([]);

  useEffect(() => {
    async function getProdutos() {
      const resultado = await pegarProdutos();
      setCarrinho(resultado);
      setQuantidade(resultado.length);
    }

    getProdutos();
  }, []);

  const viuProduto = async (produto) => {
    setQuantidade(quantidade + 1);

    const resultado = await salvarProduto(produto);

    let novoCarrinho = carrinho;
    novoCarrinho.push(resultado);
    setCarrinho(novoCarrinho);

    let novoUltimosVistos = new Set(ultimosVistos);
    novoUltimosVistos.add(produto);
    setUltimosVistos([...novoUltimosVistos]);
  }

  return (
    <ProdutosContext.Provider
      value={{
        quantidade,
        carrinho,
        ultimosVistos,
        viuProduto
      }}
    >
      {children}
    </ProdutosContext.Provider>
  )
}