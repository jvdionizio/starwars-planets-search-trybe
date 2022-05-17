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
      filterByNumericValues.forEach((filterObj) => {
        switch (filterObj) {
        case 'population':
          break;
        default:
          console.log('default');
        }
      });
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
