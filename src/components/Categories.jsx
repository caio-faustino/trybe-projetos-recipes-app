import React from 'react';
import useSWR from 'swr';
import { fetchCategories } from '../util/fetchers';

function CategoriesWrapped({ isMeal }) {
  // console.log('CategoriesWrapped: isMeal: ', isMeal);
  const trem = isMeal ? 'meals' : 'drinks';
  // console.log(`Estou procurando: ${trem}`);

  const { data, error, isLoading } = useSWR(
    `categories/${trem}`,
    () => fetchCategories(isMeal),
  );

  return (
    <>
      { isLoading && (<div>Carregando categorias...</div>)}
      { !isLoading && error && (
        <div>
          Não foi possível carregar categorias:
          {error.message}
        </div>) }
      { !isLoading && data && data.map((category) => {
        const categoria = category.strCategory;
        return (
          <div
            key={ categoria }
            data-testid={ `${categoria}-category-filter` }
          >
            {categoria}
          </div>
        );
      })}
    </>
  );
}

CategoriesWrapped.propTypes = { }.isRequired;

export const Categories = React.memo(CategoriesWrapped);
