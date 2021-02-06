import React from 'react';
import './App.scss';
import Dropdown from './Dropdown';
import useSchema from './App.schema';

function App() {
  const schema = useSchema();

  const handleOnChange = data => {
    console.log(data);
  };

  return (
    <div className="container">
      <Dropdown
        title="multi select title"
        items={schema}
        onChange={handleOnChange}
        multiSelect
      />
    </div>
  );
}

export default App;
