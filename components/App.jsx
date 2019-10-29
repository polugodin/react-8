import React, { useState } from 'react';
import Axios from 'axios';

import './App.css';
import Autocomplete from './Autocomplete';

const fetchData = () => Axios.get('/options');
const valueField = obj => obj.capital;
const textField = 'country';
const placeholder = 'введите название страны';
const className = 'autocomplete';
const optionsClassName = 'autocomplete__options';
const inputClassName = 'autocomplete__input';
const label = 'ввод на русском, выбирать мышкой';
const renderItem = item => (
  <div className="autocomplete__item">
    {item.country}
    <img className="autocomplete__item__img" src={item.img} />
  </div>
);

const App = () => {
  const [capital, setCapital] = useState('');

  return (
    <div>
      <h2>Столица: {capital}</h2>
      <Autocomplete
        fetchData={fetchData}
        valueField={valueField}
        onChange={value => setCapital(value)}
        className={className}
        optionsClassName={optionsClassName}
        inputClassName={inputClassName}
        placeholder={placeholder}
        textField={textField}
        renderItem={renderItem}
        label={label}
      />
    </div>
  );
};

export default App;
