import React, { memo, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// core components
import FormControl from '@material-ui/core/FormControl';
// theme components
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import { useDebouncedCallback } from 'use-debounce';

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

const TemplateInfo = ({
  templateName,
  onNameChange,
  templateQuantity,
  onChangeQuantity
}) => {
  const classes = useStyles();
  const [name, setName] = useState(templateName);
  const [quantity, setQuantity] = useState(templateQuantity);

  useEffect(() => {
    setName(templateName);
    setQuantity(templateQuantity);
  }, [templateName, templateQuantity]);

  const [handleNameChangeDebounce] = useDebouncedCallback(
    newName => onNameChange(newName),
    450
  );

  const [handleQuantityChangeDebounce] = useDebouncedCallback(
    _quantity => onChangeQuantity(_quantity),
    450
  );

  const handleNameChange = e => {
    setName(e.target.value);
    if (e.target.value === '') return;
    handleNameChangeDebounce(e.target.value);
  };

  const handleChangeQuantity = e => {
    setQuantity(e.target.value);
    if (e.target.value >= 1) {
      handleQuantityChangeDebounce(e.target.value);
      return;
    }
    handleQuantityChangeDebounce(1);
  };

  return (
    <>
      <Container className={classes.container}>
        <Grid item>
          <FormControl className={classes.formControl} sm={3}>
            <TextField
              defaultValue={templateName}
              autoFocus
              placeholder="Digite o nome do template"
              value={name || templateName}
              onChange={handleNameChange}
            />
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
              defaultValue={templateQuantity}
              type="number"
              placeholder="Quantidade de templates"
              value={quantity}
              onChange={handleChangeQuantity}
            />
          </FormControl>
        </Grid>
      </Container>
    </>
  );
};

TemplateInfo.propTypes = {
  onNameChange: PropTypes.func,
  templateName: PropTypes.string,
  templateQuantity: PropTypes.number,
  onChangeQuantity: PropTypes.func
};

export default memo(TemplateInfo);
