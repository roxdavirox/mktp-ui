/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

// core components
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// theme components
import GridContainer from 'components/theme/Grid/GridContainer.jsx';
import GridItem from 'components/theme/Grid/GridItem.jsx';

import {
  setTemplateName,
  selectTemplateName
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

const InfoItem = ({
  options,
  templateName,
  onChangeSelectOption,
  selectedOption,
  onNameChange
}) => {
  const classes = useStyles();

  return (
    <>
      <GridContainer className={classes.container}>
        <GridItem xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <TextField
              value={templateName}
              placeholder="Nome do template"
              onChange={onNameChange}
              // onBlur={e => dispatch(setTemplateName(e.target.value))}
            />
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="option-input">Opção</InputLabel>
            <Select
              className={classes.select}
              value={selectedOption}
              onChange={onChangeSelectOption}
              input={<Input id="option-input" />}
            >
              <MenuItem value="0">
                <em>Selecione uma opção</em>
              </MenuItem>
              {options &&
                options.map(op => (
                  <MenuItem key={op._id} value={op._id}>
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

InfoItem.propTypes = {
  templateName: PropTypes.object,
  onTemplateNameChange: PropTypes.func.isRequired,
  selectedOption: PropTypes.object,
  onChangeSelectOption: PropTypes.func.isRequired,
  options: PropTypes.array
};

export default InfoItem;
