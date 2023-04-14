import React from 'react';
import useSWR from 'swr';
import * as Toggle from '@radix-ui/react-toggle';
import { useHistory } from 'react-router-dom';
import { fetchCategories } from '../util/fetchers';

function CategoriesWrapped({ filters, setFilters }) {
  const history = useHistory();
  const { pathname } = history.location;
  const isMeal = pathname.includes('/meals');

  const trem = isMeal ? 'meals' : 'drinks';
  const quantasCategorias = 5;

  const { data, error, isLoading } = useSWR(
    `categories/${trem}`,
    () => fetchCategories(isMeal, quantasCategorias),
  );

  const categories = filters ? filters.categories : [];

  return (
    <div className="flex gap-[5px]">
      {isLoading && (<div>Carregando categorias...</div>)}
      {!isLoading && error && (
        <div>
          Não foi possível carregar categorias:
          {error.message}
        </div>)}

      {!isLoading && (
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <Toggle.Root
            className="primeiroBotao"
            data-testid="All-category-filter"
            pressed={ categories.length === 0 }
            onPressedChange={ () => {
              setFilters({ ...filters, categories: [] });
            } }
          >
            All
          </Toggle.Root>

          {data?.map((category, index) => {
            const categoria = category.strCategory;
            return (
              <Toggle.Root
                className={ (index + 1) < quantasCategorias ? 'botoesDoMeio' : 'ultimoBotao' }
                key={ categoria }
                data-testid={ `${categoria}-category-filter` }
                pressed={ categories.includes(categoria) }
                /* className="cursor-pointer" */
                onPressedChange={ (pressed) => {
                  if (pressed) {
                    setFilters({ ...filters, categories: [categoria] });
                  } else {
                    setFilters({ ...filters, categories: [] });
                  }
                } }
              >
                {categoria}
              </Toggle.Root>
            );
          })}
        </div>
      )}
    </div>
  );
}

CategoriesWrapped.propTypes = {}.isRequired;

export const Categories = React.memo(CategoriesWrapped);
