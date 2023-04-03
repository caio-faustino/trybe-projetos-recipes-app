import React from 'react';

function DrinkInProgress() {
  const { id } = useParams();

  return (
    <p>
      Sou o drink de id
      {id}
    </p>
  );
}

export default React.memo(DrinkInProgress);
