import React from 'react';
import { useAsync } from '../useAsync';
import { fetchCategories } from '../util/fetchCategories';

function CategoriesWrapped({ isMeal }) {
  const { status, value, error } = useAsync(() => fetchCategories(isMeal));

  // console.log('status', status);
  return (
    <>
      { status === 'pending' && (<div>Carregando categorias...</div>)}
      { status === 'error' && (
        <div>
          Não foi possível carregar categorias:
          {error}
        </div>) }
      { status === 'success' && value.map((category) => {
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
