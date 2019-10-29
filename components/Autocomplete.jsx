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
  inputClassName
}) => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isRenderOptions, setIsRenderOptions] = useState(false);

  useEffect(() => {
    fetchData().then(({ data }) => setData(data));
  }, [fetchData]);

  const upData = () => {
    let eq = false;
    for (let i = 0; i < data.length; i++)
      if (data[i][textField].toLowerCase() === inputValue.toLowerCase()) {
        setIsRenderOptions(false);
        onChange(typeof valueField === 'function' ? valueField(data[i]) : data[i][valueField]);
        eq = true;
        break;
      }
    if (!eq) onChange('');
  };

  useEffect(() => {
    upData();
  }, [inputValue]);

  const onChangeHandler = e => {
    setIsRenderOptions(true);
    setInputValue(e.target.value);
  };

  return (
    <div className={className}>
      <div>{label}</div>
      <input
        type="text"
        className={inputClassName}
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={inputValue}
      />
      <div className={optionsClassName}>
        {inputValue !== '' &&
          isRenderOptions &&
          data
            .map(item => {
              if (item[textField].toLowerCase().indexOf(inputValue.toLowerCase()) === 0) {
                return (
                  <div key={item.id} onClick={() => setInputValue(item[textField])}>
                    {renderItem(item)}
                  </div>
                );
              }
            })
            .filter(i => i)}
      </div>
    </div>
  );
};

Autocomplete.propTypes = {
  fetchData: PropTypes.func.isRequired,
  valueField: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  textField: PropTypes.string.isRequired,
  className: PropTypes.string,
  optionsClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired
};

export default Autocomplete;
