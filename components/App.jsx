import React, { useState } from 'react';
import Axios from 'axios';

import './App.css';
import Autocomplete from './Autocomplete';

const fetchData = match => Axios.get('/options', { params: { match } });
const valueField = obj => obj.capital;
const textField = 'country';
const placeholder = 'введите название страны';
const className = 'autocomplete';
const optionsClassName = 'autocomplete__options';
const inputClassName = 'autocomplete__input';
const label = 'ввод на русском, выбирать мышкой';
const noOptionMessage = <div className="autocomplete__no-option-message">не найдено</div>;
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
        onChange={setCapital}
        className={className}
        optionsClassName={optionsClassName}
        inputClassName={inputClassName}
        placeholder={placeholder}
        textField={textField}
        renderItem={renderItem}
        label={label}
        noOptionMessage={noOptionMessage}
      />
    </div>
  );
};

export default App;
