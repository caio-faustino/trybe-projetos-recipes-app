import React from 'react';
import { useParams } from 'react-router-dom';

function Receita() {
  const { id } = useParams();

  return (
    <p>
      olar sou uma receita de
      {' '}
      {id}
    </p>
  );
}

export default React.memo(Receita);
