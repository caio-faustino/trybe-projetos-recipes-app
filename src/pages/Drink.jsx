import React from 'react';

function Drink() {
  const { id } = useParams();

  return (
    <p>
      Sou o drink de id
      {id}
    </p>
  );
}

export default React.memo(Drink);
