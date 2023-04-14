import React from 'react';
import useSWR from 'swr';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useHistory } from 'react-router-dom';
import { fetchCategories } from '../util/fetchers';

function Categories({ category, setCategory }) {
  const history = useHistory();
  const { pathname } = history.location;
  const isMeal = pathname.includes('/meals');

  const trem = isMeal ? 'meals' : 'drinks';
  const quantasCategorias = 5;

  const { data, error, isLoading } = useSWR(
    `categories/${trem}`,
    () => fetchCategories(isMeal, quantasCategorias),
  );

  return (
    <div className="flex gap-[5px]">
      {isLoading && (<div>Carregando categorias...</div>)}
      {!isLoading && error && (
        <div>
          Não foi possível carregar categorias:
          {error.message}
        </div>)}

      {!isLoading && (
        <ToggleGroup.Root
          className="inline-flex rounded-md shadow-sm"
          type="single"
          defaultValue="All"
          aria-label="Filter by category"
          value={ category }
          onValueChange={ (cat) => setCategory(cat) }
        >
          <ToggleGroup.Item
            className="primeiroBotao"
            data-testid="All-category-filter"
            value="All"
            aria-label="All categories"
          >
            All
          </ToggleGroup.Item>
          {data?.map((cat, index) => {
            const categoria = cat.strCategory;
            return (
              <ToggleGroup.Item
                key={ categoria }
                data-testid={ `${categoria}-category-filter` }
                className={ (index + 1) < quantasCategorias
                  ? 'botoesDoMeio' : 'ultimoBotao' }
                value={ categoria }
                aria-label={ categoria }
              >
                {categoria}
              </ToggleGroup.Item>
            );
          })}
        </ToggleGroup.Root>
      )}
    </div>
  );
}

Categories.propTypes = {}.isRequired;

export default React.memo(Categories);
