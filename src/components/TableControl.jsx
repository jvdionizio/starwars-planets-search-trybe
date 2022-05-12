/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import Context from '../context/Context';

function TableControl() {
  const { filters, setFilters, getPlanets } = useContext(Context);
  const { name } = filters.filterByName;

  const handleChange = ({ target }) => {
    setFilters({
      ...filters,
      filterByName: {
        name: target.value,
      },
    });
    getPlanets();
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ name }
        onChange={ handleChange }
      />
    </div>
  );
}

export default TableControl;
