import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
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

const puxarProdutos = async (
  endpointDaPesquisa,
  setFilteredSearchResult,
  limiteDeReceitas,
  history,
) => {
  const { pathname } = history.location;
  const isMeal = pathname.includes('meals');

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
};

function Receitas() {
  const [category, setCategory] = useState('All');
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

  useEffect(() => {
    const func = async () => {
      if (category === 'All') {
        // Não selecionou categoria
        await puxarProdutos(
          pesquisa.endpoint,
          setFilteredSearchResult,
          limiteDeReceitas,
          history,
        );
      } else {
        // se não há pesquisa, olha as categorias

        const categoryText = category === 'All' ? '' : category;

        const endpoint = isMeal
          ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryText}`
          : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryText}`;
        const productsList = await pegarListaDeProdutos(endpoint, isMeal);
        setFilteredSearchResult(productsList.slice(0, limiteDeReceitas));
      }
    };
    func().then();
  }, [category, pesquisa.endpoint, isMeal, history]);

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
      <Categories category={ category } setCategory={ setCategory } />
      <SearchResult recipes={ filteredSearchResult } />
      <Footer />
    </>
  );
}

export default React.memo(Receitas);
