import React from 'react';

export function SearchBar() {
  return (
    <div className="search-bar">
      <input
        type="search"
        data-testid="search-input"
        placeholder="Buscar Receitas"
      />
      <div className="search-options">
        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            name="search-option"
            id="ingredient-search-radio"
            value="ingredient"
            data-testid="ingredient-search-radio"
          />
          Buscar por ingrediente
        </label>
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            name="search-option"
            id="name-search-radio"
            value="name"
            data-testid="name-search-radio"
          />
          Buscar por nome
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            name="search-option"
            id="first-letter-search-radio"
            value="first-letter"
            data-testid="first-letter-search-radio"
          />
          Buscar pela primeira letra
        </label>
      </div>
      <button type="button" data-testid="exec-search-btn">Buscar</button>
    </div>
  );
}
