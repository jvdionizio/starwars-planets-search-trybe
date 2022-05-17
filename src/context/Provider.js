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

  useEffect(() => {
    fetchPlanets().then((Arr) => setData(Arr));
    fetchPlanets().then((Arr) => setPlanetsArr(Arr));
  }, []);

  const dataProcessing = (planet) => {
    const { filterByNumericValues } = filterNum;
    const bools = [];
    filterByNumericValues.forEach((filterObj) => {
      switch (filterObj.comparison) {
      case 'maior que':
        bools.push(Number(planet[filterObj.column]) >= Number([filterObj.value]));
        break;

      case 'menor que':
        bools.push(Number(planet[filterObj.column]) <= Number([filterObj.value]));
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

  const filterPlanets = () => {
    const { name } = filterName.filterByName;
    const { filterByNumericValues } = filterNum;
    let filteredList = planetsArr;
    if (name !== '') {
      filteredList = data
        .filter((planet) => planet.name.toLowerCase()
          .includes(name.toLowerCase()));
    }
    if (filterByNumericValues) {
      filteredList = filteredList.filter(dataProcessing);
    }
    setData(filteredList);
  };

  return (
    <Context.Provider
      value={ {
        filterName,
        setFilterName,
        filterPlanets,
        data,
        filterNum,
        setFilterNum,
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
