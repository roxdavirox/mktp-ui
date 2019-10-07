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
import Card from '@material-ui/core/Card';
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
    display: 'initial'
  },
  select: { height: '37px' },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 320
  }
}));

const InfoItem = ({ options }) => {
  const classes = useStyles();
  const [nameState, setNameState] = useState('');
  const dispatch = useDispatch();
  const name = useSelector(selectTemplateName);
  const option = useSelector(selectOption);

  const handleNameChange = event => {
    const { value: name } = event.target;
    const newName = name.length >= 3 ? 'success' : 'error';

    setNameState(newName);
    dispatch(setTemplateName(name));
  };

  const handleChangeSelect = e => dispatch(setOption(e.target.value));

  return (
    <>
      <GridContainer className={classes.container}>
        <Card>
          <GridItem xs={12} sm={12}>
            <h3 className={classes.infoText}>Configure o template</h3>
          </GridItem>
          <GridItem xs={12} sm={6}>
            <FormControl className={classes.formControl}>
              <CustomInput
                success={nameState === 'success'}
                error={nameState === 'error'}
                labelText={
                  <span>
                    Nome do template <small>(obrigatório)</small>
                  </span>
                }
                id="firstname"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: event => handleNameChange(event),
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      className={classes.inputAdornment}
                    >
                      <Build className={classes.inputAdornmentIcon} />
                    </InputAdornment>
                  ),
                  value: name
                }}
              />
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={8}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="option-input">Opção</InputLabel>
              <Select
                className={classes.select}
                value={option}
                onChange={handleChangeSelect}
                input={<Input id="option-input" />}
              >
                <MenuItem value="0">
                  <em>Selecione</em>
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
        </Card>
      </GridContainer>
    </>
  );
};

export default InfoItem;
