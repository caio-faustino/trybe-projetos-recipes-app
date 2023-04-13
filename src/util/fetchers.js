export const fetchJson = async (...args) => {
  const response = await fetch(...args);
  return response.json();
};

const MAX_CAT = 5;

export const fetchCategories = async (isMeal, maximo = MAX_CAT) => {
  const endpoint = isMeal
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  // console.log('endpoint', endpoint);
  const response = await fetch(endpoint);
  if (!response.ok) return [];
  // console.log('response', response);
  const data = await response.json();
  // console.log('data: ', data);
  if (!data) return [];
  const chaves = Object.keys(data);
  if (!chaves.includes('meals') && !chaves.includes('drinks')) return [];
  const categories = isMeal ? data.meals : data.drinks;
  return categories ? categories.slice(0, maximo) : [];
};

export const pegarReceita = async (isMeal, id) => {
  const endpoint = isMeal
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const response = await fetch(endpoint);
  if (!response.ok) return [];
  // console.log('response', response);
  const data = await response.json();
  // console.log('data: ', data);
  if (!data) return [];
  return isMeal ? data.meals[0] : data.drinks[0];
};
