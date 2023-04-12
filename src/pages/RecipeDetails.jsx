import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import BtnStart from '../components/BtnStart';
import BtnShare from '../components/BtnShare';
import BtnLike from '../components/BtnLike';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const { pathname } = history.location;
  const [receita, setReceita] = useState();
  // const [isFavorite, setIsFavorite] = useState(false);
  const [, setDrinkRecomendados] = useState([]);
  const [, setComidasRecomendadas] = useState([]);
  // const [receitasFavoritas, setReceitasFavoritas] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [video, setVideo] = useState('');
  const limiteDeReceitas = 6;
  useEffect(() => {
    // Precisa disso ?
    // setReceitasFavoritas(JSON.parse(localStorage.getItem('favoriteRecipes')));
    //-----
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
        console.log(ytVideo);
        const finalVideo = `https://www.youtube.com/embed/${ytVideo}`;
        setVideo(finalVideo);
      }
    }
  }, [receita]);
  return (
    <div>
      {
        (receita)
        && (
          <div>
            { pathname.includes('meals')
              ? (
                <div>
                  <div>
                    <img
                      data-testid="recipe-photo"
                      src={ receita.strMealThumb }
                      alt="foto da receita"
                    />
                    <h1 data-testid="recipe-title">{receita.strMeal}</h1>
                    <p data-testid="recipe-category">
                      {receita.strCategory}
                    </p>
                    <BtnShare pathname={ pathname } />
                    <BtnLike receita={ receita } />
                  </div>
                  <div>
                    <h2 data-testid="recipe-category">Ingredients</h2>
                    {
                      ingredientes.map((element, index) => (
                        <li
                          key={ index }
                          data-testid={ element[1] }
                        >
                          {`${receita[element[0]]}:${receita[element[2]]}`}
                        </li>
                      ))
                    }
                  </div>
                  <div>
                    <h2 data-testid="recipe-category">Instructions</h2>
                    <p data-testid="instructions">{receita.strInstructions}</p>
                  </div>

                  <div>
                    <iframe
                      data-testid="video"
                      title="Video"
                      width="420"
                      height="315"
                      src={ video }
                    />
                  </div>
                </div>

              )
              : (
                <div>
                  <div>
                    <img
                      data-testid="recipe-photo"
                      src={ receita.strDrinkThumb }
                      alt="foto da receita"
                    />
                    <h1 data-testid="recipe-title">{receita.strDrink}</h1>
                    <p data-testid="recipe-category">
                      {`${receita.strCategory} : ${receita.strAlcoholic}`}
                    </p>
                    <BtnShare pathname={ pathname } />
                    <BtnLike receita={ receita } />
                  </div>
                  <div>
                    <h2 data-testid="recipe-category">Ingredients</h2>
                    {
                      ingredientes.map((element, index) => (
                        <li
                          key={ index }
                          data-testid={ element[1] }
                        >
                          {`${receita[element[0]]}:${receita[element[2]]}`}
                        </li>
                      ))
                    }
                  </div>
                  <div>
                    <h2 data-testid="recipe-category">Instructions</h2>
                    <p data-testid="instructions">{receita.strInstructions}</p>
                  </div>
                </div>
              )}
            <BtnStart
              type={ (pathname.includes('meals')
                ? 'meals' : 'drinks') }
              id={ (receita.idMeal) ? receita.idMeal : receita.idDrink }
            />
          </div>
        )
      }
    </div>
  );
}
RecipeDetails.propTypes = { }.isRequired;
export default React.memo(RecipeDetails);
