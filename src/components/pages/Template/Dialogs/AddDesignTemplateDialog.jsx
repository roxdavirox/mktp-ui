/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
//core
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'grid',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  select: { height: '37px' }
});

const AddDesignTemplateDialog = ({
  enqueueSnackbar: snack,
  onClose,
  onAddDesignTemplate,
  classes,
  open
}) => {
  const handleSubmit = () => {
    snack(`Adicionando template`, {
      variant: 'info',
      autoHideDuration: 2000
    });

    onClose();
  };

  return (
    <div>
      <MuiDialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Adicionar Template</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <label htmlFor="preview">
                Selecione uma imagem de visualização do template:
              </label>
              <input
                type="file"
                id="preview"
                name="preview"
                accept="image/png, image/jpeg"
                onChange={e => console.log(e.target.files)}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <label htmlFor="photoshop">
                Selecione o arquivo PSD do template:
              </label>
              <input
                type="file"
                id="photoshop"
                name="photoshop"
                accept="image/psd"
                onChange={e => console.log(e.target.files)}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </MuiDialog>
    </div>
  );
};

AddDesignTemplateDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(AddDesignTemplateDialog));
