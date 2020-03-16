import React, { memo } from 'react';
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
    minWidth: 350
  }
}));

const InfoItem = ({
  templateName,
  onNameChange,
  templateQuantity,
  onChangeQuantity
}) => {
  const classes = useStyles();

  const handleNameChange = e => onNameChange(e.target.value);
  const handleChangeQuantity = e => onChangeQuantity(e.target.value);

  return (
    <>
      <Container className={classes.container}>
        <Grid item>
          <FormControl className={classes.formControl} sm={3}>
            {templateName !== '' ? (
              <TextField
                autoFocus
                placeholder="Digite o nome do template"
                onBlur={handleNameChange}
              />
            ) : (
              <TextField
                autoFocus
                placeholder="Digite o nome do template"
                value={templateName}
                onChange={handleNameChange}
              />
            )}
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl
            className={classes.formControl}
            style={{ minWidth: 200 }}
            sm={6}
            lg={4}
          >
            <TextField
              type="number"
              placeholder="Quantidade de templates"
              value={templateQuantity}
              onChange={handleChangeQuantity}
            />
          </FormControl>
        </Grid>
      </Container>
    </>
  );
};

InfoItem.propTypes = {
  onNameChange: PropTypes.func,
  templateName: PropTypes.string,
  templateQuantity: PropTypes.number,
  onChangeQuantity: PropTypes.func
};

export default memo(InfoItem);
