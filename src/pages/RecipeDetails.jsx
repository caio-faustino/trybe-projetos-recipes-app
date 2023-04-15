import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import DetailedMeal from '../components/DetailedMeal';

function RecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = history.location;
  const [receita, setReceita] = useState();
  const [, setDrinkRecomendados] = useState([]);
  const [, setComidasRecomendadas] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [video, setVideo] = useState('');
  const limiteDeReceitas = 6;
  // const limiteDeIngredientes = 21;
  // // const [tipoReceita, setTipo] = useState('');
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

  useEffect(() => {
    if (receita) {
      const limiteDeIngredientes = 21;
      const keysIngredients = Object.keys(receita)
        .filter((element) => element.includes('Ingredient'));
      const keysMeasurements = Object.keys(receita)
        .filter((element) => element.includes('Measure'));

      let limite = 0;
      for (let i = 0; i < limiteDeIngredientes; i += 1) {
        if ((receita[keysIngredients[i]] == null
           || (receita[keysIngredients[i]] === ''))) {
          limite = keysIngredients.slice(0, i).length;
          break;
        }
      }
      const listaDeIngredientes = keysIngredients.slice(0, limite)
        .map((element, index) => [
          element,
          `${index}-ingredient-name-and-measure`,
          keysMeasurements[index]]);
      setIngredientes(listaDeIngredientes);
      if (receita.strYoutube) {
        const ytVideo = receita.strYoutube;
        ytVideo.slice(ytVideo.indexOf('='), ytVideo.length);
        // console.log(ytVideo);
        const finalVideo = `https://www.youtube.com/embed/${ytVideo}`;
        setVideo(finalVideo);
      }
    }
  }, [receita]);
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-6xl py-8 lg:py-16">
        {receita && (
          <DetailedMeal
            receita={ receita }
            ingredientes={ ingredientes }
            video={ video }
            pathname={ pathname }
            history={ history }
          />
        )}
        {/* {receita && !pathname.includes('meals') && (
              <DetailedDrink receita={ receita } />
          )} */}
      </div>
    </section>
  );
}

RecipeDetails.propTypes = { }.isRequired;
export default React.memo(RecipeDetails);
