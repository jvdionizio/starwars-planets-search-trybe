/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Context from './Context';
import fetchPlanets from '../helpers/starwarsplanetsApi';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterName, setFilterName] = useState({
    filterByName: {
      name: '',
    },
  });
  const [filterNum, setFilterNum] = useState({
    filterByNumericValues: [],
  });
  const [planetsArr, setPlanetsArr] = useState([]);
  const [sortParams, setSortParams] = useState({
    order: { column: '', sort: '' },
  });

  const dataProcessing = (planet) => {
    const { filterByNumericValues } = filterNum;
    const bools = [];
    filterByNumericValues.forEach((filterObj) => {
      switch (filterObj.comparison) {
      case 'maior que':
        bools.push(Number(planet[filterObj.column]) > Number([filterObj.value]));
        break;

      case 'menor que':
        bools.push(Number(planet[filterObj.column]) < Number([filterObj.value]));
        break;

      case 'igual a':
        bools.push(Number(planet[filterObj.column]) === Number([filterObj.value]));
        break;

      default:
        bools.push(true);
      }
    });
    return bools.every((el) => el);
  };

  const sortingByColumn = (column, sort, filteredList) => filteredList.sort((a, b) => {
    if (Number.isNaN(Number(a[column]))) return 1;
    if (Number.isNaN(Number(b[column]))) return 1;
    if (Number(a[column]) === Number(b[column])) return 0;
    if (sort === 'ASC') return Number(a[column]) - Number(b[column]);
    if (sort === 'DESC') return Number(b[column]) - Number(a[column]);
    return 0;
  });

  const sorting = (Arr) => {
    const MENOS_UM = -1;
    return Arr.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return MENOS_UM;
      }
      return 0;
    });
  };

  const filterPlanets = () => {
    const { name } = filterName.filterByName;
    const { filterByNumericValues } = filterNum;
    const { column, sort } = sortParams.order;
    let filteredList = planetsArr;
    if (name !== '') {
      filteredList = planetsArr
        .filter((planet) => planet.name.toLowerCase()
          .includes(name.toLowerCase()));
    }
    if (filterByNumericValues) {
      filteredList = filteredList.filter(dataProcessing);
    }
    if (column.length !== 0) {
      setData(sortingByColumn(column, sort, filteredList));
    } else {
      setData(filteredList);
    }
  };

  useEffect(() => {
    fetchPlanets().then((Arr) => setData(sorting(Arr)));
    fetchPlanets().then((Arr) => setPlanetsArr(Arr));
  }, []);

  return (
    <Context.Provider
      value={ {
        planetsArr,
        filterName,
        setFilterName,
        filterPlanets,
        data,
        filterNum,
        setFilterNum,
        sorting,
        sortParams,
        setSortParams,
      } }
    >
      {children}
    </Context.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
