import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// core components
import FormControl from '@material-ui/core/FormControl';
// theme components
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

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
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  select: { height: '37px' },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 400
  }
}));

const InfoItem = ({ templateName, onNameChange }) => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.container}>
        <Grid item>
          <FormControl className={classes.formControl} sm={3}>
            {templateName !== '' ? (
              <TextField
                autoFocus
                placeholder="Nome do template"
                onBlur={e => onNameChange(e.target.value)}
              />
            ) : (
              <TextField
                autoFocus
                placeholder="Nome do template"
                value={templateName}
                onChange={e => onNameChange(e.target.value)}
              />
            )}
          </FormControl>
        </Grid>
      </Container>
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
