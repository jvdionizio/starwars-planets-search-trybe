import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';
import fetchPlanets from '../helpers/starwarsplanetsApi';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
  });

  const getPlanets = async () => {
    const response = await fetchPlanets();
    const { name } = filters.filterByName;
    let filteredList;
    if (name !== '') {
      filteredList = response
        .filter((planet) => planet.name.toLowerCase()
          .includes(name.toLowerCase()));
    } else {
      filteredList = response;
    }
    console.log(filteredList);
    setData(filteredList);
  };

  return (
    <Context.Provider
      value={ {
        filters,
        setFilters,
        getPlanets,
        data,
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
