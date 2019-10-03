/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// core components
import InputAdornment from '@material-ui/core/InputAdornment';
import Build from '@material-ui/icons/Build';
// theme components
import GridContainer from 'components/theme/Grid/GridContainer.jsx';
import GridItem from 'components/theme/Grid/GridItem.jsx';
import CustomInput from 'components/theme/CustomInput/CustomInput.jsx';

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
  select: { height: '37px' },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 220
  }
}));

const NameStep = () => {
  const classes = useStyles();
  const [nameState, setNameState] = useState('');
  const [name, setTemplateName] = useState('');

  const handleNameChange = event => {
    const { value: name } = event.target;
    const newName = name.length >= 3 ? 'success' : 'error';

    setNameState(newName);
    setTemplateName(name);
  };

  return (
    <>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12}>
          <h4 className={classes.infoText}>Digite o nome do template</h4>
        </GridItem>
        <GridItem xs={12} sm={6}>
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
        </GridItem>
      </GridContainer>
    </>
  );
};

export default NameStep;
