import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = history.location;
  const [receita, setReceita] = useState();
  const [drinkRecomendados, setDrinkRecomendados] = useState([]);
  const [comidasRecomendadas, setComidasRecomendadas] = useState([]);
  const limiteDeReceitas = 6;
  // // const [tipoReceita, setTipo] = useState('');
  console.log(history);
  useEffect(() => {
    if (pathname.includes('meals')) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setReceita(data.meals[0]);
        });
      fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => {
          setDrinkRecomendados(data.drinks.slice(0, limiteDeReceitas));
        });
    }
    if (pathname.includes('drinks')) {
      console.log('Passei');
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setReceita(data.drinks[0]);
        });
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => {
          setComidasRecomendadas(data.meals.slice(0, limiteDeReceitas));
        });
    }
  }, [pathname, id]);
  return (
    <p>
      olar sou uma receita de id
      {id}
    </p>
  );
}
RecipeDetails.propTypes = { }.isRequired;
export default React.memo(RecipeDetails);
