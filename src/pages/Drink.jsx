import React from 'react';
import { useParams } from 'react-router-dom';

function Drink() {
  const { id } = useParams();
  // PROVAVELMENTE NAO VAI PRECISAR DESSE COMPONENTE
  return (
    <p>
      Sou o drink de id
      {id}
    </p>
  );
}

export default React.memo(Drink);
