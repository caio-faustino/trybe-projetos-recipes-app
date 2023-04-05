import React from 'react';
import { useParams } from 'react-router-dom';

function Recipe(props) {
  const { id } = useParams();
  const { location: { state } } = props;
  const meal = state;// Essa logica como vem do SearchBar pode ser usada para renderizar toda a lista
  console.log(meal);
  return (
    <p>
      olar sou uma receita de id
      {id}
    </p>
  );
}
Recipe.propTypes = { }.isRequired;
export default React.memo(Recipe);
