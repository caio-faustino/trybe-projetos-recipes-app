import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export async function fetchRecipe(id, tipoReceita) {
  console.log(tipoReceita, id);
  if (tipoReceita === 'meal') {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    return data;
  }

  if (tipoReceita === 'drink') {
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    return data;
  }
}

function RecipeDetails(props) {
  const { id } = useParams();
  const { history } = props;
  const [receita, setReceita] = useState();
  // const [tipoReceita, setTipo] = useState('');

  console.log(props);
  if (history.location.pathname.includes('/meals')) {
    const tipoReceita = 'meal';
  }
  if (history.location.pathname.includes('/drinks')) {
    const tipoReceita = 'drink';
  }
  // console.log(tipoReceita);
  useEffect(() => {
    fetchRecipe(id, tipoReceita);
  }, []);
  console.log(receita);
  return (
    <p>
      olar sou uma receita de id
      {id}
    </p>
  );
}
RecipeDetails.propTypes = { }.isRequired;
export default React.memo(RecipeDetails);
