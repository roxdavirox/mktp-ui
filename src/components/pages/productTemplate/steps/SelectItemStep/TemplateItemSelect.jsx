/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// eslint-disable-next-line react/prop-types
const TemplateItemSelect = ({ items }) => {
  const [value, setValue] = useState('0');
  return (
    <FormControl>
      <Select value={value} onChange={event => setValue(event.target.value)}>
        <MenuItem key={'0'} value={'0'}>
          Selecione
        </MenuItem>
        {items &&
          items.map(item => (
            <MenuItem key={item._id} value={item._id}>
              {item.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default TemplateItemSelect;
