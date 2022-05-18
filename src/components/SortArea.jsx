import React, { useState, useContext } from 'react';
import Context from '../context/Context';

function SortArea() {
  const { setSortParams, sorting } = useContext(Context);

  const [localValuesSort, setLocalValuesSort] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const handleChange = ({ target }) => {
    const { name } = target;
    setLocalValuesSort({
      ...localValuesSort,
      [name]: target.value,
    });
  };

  const handleClick = () => {
    setSortParams({ order: localValuesSort });
    sorting();
  };

  return (
    <div>
      <label htmlFor="column">
        Ordenar
        <select
          data-testid="column-sort"
          name="column"
          id="column"
          value={ localValuesSort.column }
          onChange={ handleChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="sort">
        <label htmlFor="ASC">
          <input
            type="radio"
            value="ASC"
            name="sort"
            id="ASC"
            data-testid="column-sort-input-asc"
            onChange={ handleChange }
          />
          Ascendente
        </label>
        <label htmlFor="DESC">
          <input
            type="radio"
            value="DESC"
            name="sort"
            id="DESC"
            data-testid="column-sort-input-desc"
            onChange={ handleChange }
          />
          Descendente
        </label>
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleClick }
      >
        Ordenar
      </button>
    </div>
  );
}

export default SortArea;
