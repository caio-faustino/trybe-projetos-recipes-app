import React, { useMemo } from 'react';
import { ContextoBonito } from '../ContextoBonito';
import { useLocalStorage } from '../useLocalStorage';

export const CHAVE_FAVORITOS = 'favoriteRecipes';

function ProvedorContexto({ children }) {
  const [receitasFavoritas, setReceitasFavoritas] = useLocalStorage(CHAVE_FAVORITOS, []);

  const objeto = useMemo(() => {
    const addFavorite = (receita) => {
      const isFavorite = receitasFavoritas.some((fav) => fav.id === receita.id);
      if (!isFavorite) {
        setReceitasFavoritas((prevState) => [...prevState, receita]);
      }
    };

    const removeFavoriteById = (id) => {
      const novoArray = receitasFavoritas.filter((fav) => fav.id !== id);
      if (novoArray.length !== receitasFavoritas.length) {
        setReceitasFavoritas(novoArray);
      }
    };

    return {
      favorites: receitasFavoritas,
      addFavorite,
      removeFavoriteById,
    };
  }, [receitasFavoritas, setReceitasFavoritas]);

  return (
    <ContextoBonito.Provider value={ objeto }>
      {children}
    </ContextoBonito.Provider>
  );
}

ProvedorContexto.propTypes = { }.isRequired;

export default React.memo(ProvedorContexto);
