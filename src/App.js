import React from 'react';
import './App.css';
import Table from './components/Table';
import TableControl from './components/TableControl';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <TableControl />
      <Table />
    </Provider>
  );
}

export default App;
