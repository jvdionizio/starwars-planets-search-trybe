/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/Context';
import SortArea from './SortArea';

function TableControl() {
  const { filterName, setFilterName, setFilterNum, filterNum } = useContext(Context);
  const [localValuesNum, setLocalValuesNum] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [possibleColumns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter', 'rotation_period',
    'surface_water',
  ]);
  const { name } = filterName.filterByName;
  const { filterByNumericValues } = filterNum;

  const handleChange = ({ target }) => {
    const targetName = target.name;
    if (targetName === 'name') {
      setFilterName({
        filterByName: {
          name: target.value,
        },
      });
    }
    if (
      targetName === 'column' || targetName === 'comparison' || targetName === 'value'
    ) {
      setLocalValuesNum({
        ...localValuesNum,
        [targetName]: target.value,
      });
    }
  };

  const handleClick = () => {
    const newFilters = filterByNumericValues;
    newFilters.push(localValuesNum);
    setFilterNum({ filterByNumericValues: newFilters });
    setLocalValuesNum({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
  };

  const filterExclude = ({ target }) => {
    const sentence = target.id.split(' ');
    const newFilters = [];

    filterByNumericValues.forEach((filterObj) => {
      const ver1 = filterObj.column.includes(sentence[0]);
      const ver2 = filterObj.comparison.includes(sentence[1]);
      const ver3 = filterObj.value.includes(sentence[3]);

      if (!(ver1 && ver2 && ver3)) {
        newFilters.push(filterObj);
      }
    });

    setFilterNum({ filterByNumericValues: newFilters });
  };

  const noRepeat = () => {
    const columns = [
      'population',
      'orbital_period',
      'diameter', 'rotation_period',
      'surface_water',
    ];
    if (filterByNumericValues.length !== 0) {
      filterByNumericValues.forEach((filterObj) => {
        setColumns(
          columns.filter((column) => column !== filterObj.column),
        );
      });
    } else {
      setColumns([
        'population',
        'orbital_period',
        'diameter',
        'rotation_period',
        'surface_water',
      ]);
    }
  };

  const filterExcludeAll = () => {
    setFilterNum({ filterByNumericValues: [] });
    setColumns([
      'population',
      'orbital_period',
      'diameter', 'rotation_period',
      'surface_water',
    ]);
    setLocalValuesNum({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
  };

  useEffect(() => {
    noRepeat();
  }, [filterNum]);

  return (
    <div>
      <div>
        <label htmlFor="name">
          <input
            type="text"
            data-testid="name-filter"
            value={ name }
            name="name"
            onChange={ handleChange }
          />
        </label>
      </div>
      <div>
        <label htmlFor="column">
          Column
          <select
            data-testid="column-filter"
            name="column"
            value={ localValuesNum.column }
            onChange={ handleChange }
          >
            {
              possibleColumns.map((column, index) => (
                <option key={ index } value={ column }>{column}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="comparison">
          Comparison
          <select
            data-testid="comparison-filter"
            name="comparison"
            value={ localValuesNum.comparison }
            onChange={ handleChange }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="comparison">
          Comparison
          <input
            type="number"
            data-testid="value-filter"
            name="value"
            value={ localValuesNum.value }
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </div>
      <div>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ filterExcludeAll }
        >
          Remover Filtros
        </button>
      </div>
      <SortArea />
      <div>
        {
          filterByNumericValues.map((filtro, index) => {
            const sentence = `${filtro.column} ${filtro.comparison} ${filtro.value}`;
            return (
              <div key={ index } data-testid="filter">
                <span>{sentence}</span>
                <button
                  type="button"
                  id={ sentence }
                  onClick={ filterExclude }
                >
                  X
                </button>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default TableControl;
