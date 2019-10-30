import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Autocomplete = ({
  onChange,
  label,
  fetchData,
  className,
  renderItem,
  textField,
  valueField,
  placeholder,
  optionsClassName,
  inputClassName,
  noOptionMessage
}) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (inputValue === '') {
      setOptions([]);
      onChange('');
      return;
    }
    fetchData(inputValue).then(({ data }) => {
      if (data.matchedData.length === 0) {
        setOptions(null);
        onChange('');
        return;
      }
      // if !null
      if (!(!data.fullMatchedDataIndex && typeof data.fullMatchedDataIndex === 'object')) {
        if (typeof valueField === 'function') {
          onChange(valueField(data.matchedData[data.fullMatchedDataIndex]));
        } else onChange(data.matchedData[data.fullMatchedDataIndex][valueField]);
        data.matchedData = data.matchedData.filter((item, index) => index !== data.fullMatchedDataIndex);
      }
      setOptions(
        data.matchedData.map(item => (
          <div key={item.id} onClick={() => setInputValue(item[textField])}>
            {renderItem(item)}
          </div>
        ))
      );
      if (!data.fullMatchedDataIndex && typeof data.fullMatchedDataIndex === 'object') onChange('');
    });
  }, [inputValue]);

  return (
    <div className={className}>
      <div>{label}</div>
      <input
        type="text"
        className={inputClassName}
        placeholder={placeholder}
        onChange={e => setInputValue(e.target.value)}
        value={inputValue}
      />
      {options ? <div className={optionsClassName}>{options}</div> : noOptionMessage}
    </div>
  );
};

Autocomplete.propTypes = {
  fetchData: PropTypes.func.isRequired,
  valueField: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  textField: PropTypes.string.isRequired,
  noOptionMessage: PropTypes.node,
  className: PropTypes.string,
  optionsClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired
};

export default Autocomplete;
