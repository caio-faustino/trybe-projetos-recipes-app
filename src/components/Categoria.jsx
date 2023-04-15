import { TagIcon } from '@heroicons/react/24/outline';
import * as PropTypes from 'prop-types';
import React from 'react';

function Categoria({ strAlcoholic, strCategory }) {
  return (
    <dd className="flex items-center text-gray-900 dark:text-white">
      <TagIcon className="h-6 w-6 text-gray-500" />
      <span className="font-semibold" data-testid="recipe-category">
        {strCategory}
        {strAlcoholic ? ` - ${strAlcoholic}` : ''}
      </span>
    </dd>
  );
}

Categoria.propTypes = {
  strCategory: PropTypes.string.isRequired,
  strAlcoholic: PropTypes.string.isRequired,
};

export default React.memo(Categoria);
