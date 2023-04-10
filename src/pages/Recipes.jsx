import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import { Categories } from '../components/Categories';
import { SearchResult } from '../components/SearchResult';
import Header from '../components/Header';

const ERRO_SEM_RESULTADOS = 'Sorry, we haven\'t found any recipes for these filters.';

export const pegarListaDeProdutos = async (endpoint, isMeal) => {
  if (!endpoint) return [];
  const response = await fetch(endpoint);
  const json = await response.json();
  if (isMeal) return json.meals || [];
  return json.drinks || [];
};

function Receitas() {
  const [filters, setFilters] = useState({ categories: [] });
  const [pesquisa, setPesquisa] = useState({
    search: '',
    endpoint: '',
  });
  const [filteredSearchResult, setFilteredSearchResult] = useState([]);
  const history = useHistory();
  const { pathname } = history.location;

  const isMeal = pathname.includes('meals');
  const titulo = isMeal ? 'Meals' : 'Drinks';
  const limiteDeReceitas = 12;

  async function puxarProdutos(endpointDaPesquisa) {
    if (endpointDaPesquisa.length === 0) {
      // não pesquisou nenhum termo: puxar os 12 primeiros produtos
      const endpoint = isMeal
        ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const productsList = await pegarListaDeProdutos(endpoint, isMeal);
      setFilteredSearchResult(productsList.slice(0, limiteDeReceitas));
      return;
    }

    // pesquisou um termo: puxar os 12 primeiros produtos
    const productsList = await pegarListaDeProdutos(endpointDaPesquisa, isMeal);
    if (productsList.length === 0) {
      global.alert(ERRO_SEM_RESULTADOS);
      return;
    }
    if (isMeal && productsList.length === 1) {
      history.push({
        pathname: `/meals/${productsList[0].idMeal}`,
        state: 'meal',
      });
      return;
    }
    if (!isMeal && productsList.length === 1) {
      history.push({
        pathname: `/drinks/${productsList[0].idDrink}`,
        state: 'drink',
      });
      return;
    }
    setFilteredSearchResult(productsList.slice(0, limiteDeReceitas));
  }

  useEffect(() => {
    (async function () {
      if (filters.categories.length === 0) {
        // Não selecionou categoria
        await puxarProdutos(pesquisa.endpoint);
      } else {
        // se não há pesquisa, olha as categorias
        const endpoint = isMeal
          ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filters.categories[0]}`
          : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.categories[0]}`;
        const productsList = await pegarListaDeProdutos(endpoint, isMeal);
        setFilteredSearchResult(productsList.slice(0, limiteDeReceitas));
      }
    }());
  }, [filters.categories, pesquisa.endpoint]);

  return (
    <>
      <div>
        <Header
          title={ titulo }
          iconeProfile
          iconeSearch
          setPesquisa={ setPesquisa }
        />
      </div>
      <Categories isMeal={ isMeal } filters={ filters } setFilters={ setFilters } />
      <SearchResult isMeal={ isMeal } recipes={ filteredSearchResult } />
      <Footer />
    </>
  );
}

export default React.memo(Receitas);
