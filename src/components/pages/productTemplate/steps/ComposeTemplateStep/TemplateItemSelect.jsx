/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { setItem } from 'store/ducks/productTemplate';
// eslint-disable-next-line react/prop-types
const TemplateItemSelect = ({ items, option }) => {
  const [value, setValue] = useState('0');
  const dispatch = useDispatch();

  const handleSelectItem = e => {
    const { value: item } = e.target;
    setValue(item);
    dispatch(
      setItem({
        option,
        ...item
      })
    );
  };

  return (
    <FormControl>
      <Select value={value} onChange={handleSelectItem}>
        <MenuItem key={'0'} value={'0'}>
          Selecione
        </MenuItem>
        {items &&
          items.map(item => (
            <MenuItem key={item._id} value={item}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default TemplateItemSelect;
