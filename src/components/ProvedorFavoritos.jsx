import { memo, useMemo } from 'react';
import { ContextoBonito } from '../ContextoBonito';
import { useLocalStorage } from '../useLocalStorage';

export const CHAVE_FAVORITOS = 'favoriteRecipes';

function ProvedorContextoWrapped({ children }) {
  const [receitasFavoritas, setReceitasFavoritas] = useLocalStorage(CHAVE_FAVORITOS, []);

  const objeto = useMemo(() => {
    const addFavorite = (receita) => {
      const isFavorite = receitasFavoritas.some((fav) => fav.id === receita.id);
      if (!isFavorite) {
        setReceitasFavoritas((prevState) => [...prevState, receita]);
        // localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(receitasFavoritas));
        // console.log('Adicionou favorita!');
      }/* else {
      console.log('Já era favorita!');
    } */
    };

    const removeFavoriteById = (id) => {
      const novoArray = receitasFavoritas.filter((fav) => fav.id !== id);
      if (novoArray.length !== receitasFavoritas.length) {
        setReceitasFavoritas(novoArray);
      }/* else {
      console.log('Não era favorita!');
    } */
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

ProvedorContextoWrapped.propTypes = { }.isRequired;

export const ProvedorFavoritos = memo(ProvedorContextoWrapped);
