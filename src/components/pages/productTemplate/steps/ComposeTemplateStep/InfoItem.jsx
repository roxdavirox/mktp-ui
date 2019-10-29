/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

// core components
import InputAdornment from '@material-ui/core/InputAdornment';
import Build from '@material-ui/icons/Build';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// theme components
import GridContainer from 'components/theme/Grid/GridContainer.jsx';
import GridItem from 'components/theme/Grid/GridItem.jsx';
import CustomInput from 'components/theme/CustomInput/CustomInput.jsx';

import {
  setTemplateName,
  selectTemplateName,
  setOption,
  selectOption
} from 'store/ducks/productTemplate';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center'
  },
  inputAdornmentIcon: {
    color: '#555'
  },
  inputAdornment: {
    position: 'relative'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
    alignItems: 'center'
  },
  select: { height: '37px' },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 420
  }
}));

const InfoItem = ({ options }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const option = useSelector(selectOption);

  const handleChangeSelect = e => dispatch(setOption(e.target.value));

  return (
    <>
      <GridContainer className={classes.container}>
        <GridItem xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <TextField
              value={name}
              placeholder="Nome do template"
              onChange={e => setName(e.target.value)}
              onBlur={e => dispatch(setTemplateName(e.target.value))}
            />
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="option-input">Opção</InputLabel>
            <Select
              className={classes.select}
              value={option}
              onChange={handleChangeSelect}
              input={<Input id="option-input" />}
            >
              <MenuItem value="0">
                <em>Selecione uma opção</em>
              </MenuItem>
              {options &&
                options.map(op => (
                  <MenuItem key={op._id} value={op}>
                    {op.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </GridItem>
      </GridContainer>
    </>
  );
};

export default InfoItem;
