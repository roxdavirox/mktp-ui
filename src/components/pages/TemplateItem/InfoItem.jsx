import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// core components
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// theme components
import GridContainer from 'components/theme/Grid/GridContainer.jsx';
import GridItem from 'components/theme/Grid/GridItem.jsx';

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
  onNameChange,
  onSelectOption,
  selectedOption
}) => {
  const classes = useStyles();
  const handleChangeSelect = e => onSelectOption(e.target.value);

  return (
    <>
      <GridContainer className={classes.container}>
        <GridItem xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            {templateName !== '' ? (
              <TextField
                placeholder="Nome do template"
                onBlur={e => onNameChange(e.target.value)}
              />
            ) : (
              <TextField
                placeholder="Nome do template"
                value={templateName}
                onChange={e => onNameChange(e.target.value)}
              />
            )}
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="option-input">Opção</InputLabel>
            <Select
              className={classes.select}
              value={selectedOption}
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

InfoItem.propTypes = {
  options: PropTypes.array,
  onNameChange: PropTypes.func,
  onSelectOption: PropTypes.func,
  templateName: PropTypes.string,
  selectedOption: PropTypes.object
};

export default InfoItem;
