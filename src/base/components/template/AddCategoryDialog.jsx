/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

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

const AddCategoryDialog = ({
  enqueueSnackbar: snack,
  onClose,
  onAddCategory,
  classes,
  open
}) => {
  const [name, setName] = useState('');

  const handleNameChange = e => setName(e.target.value);

  const handleSubmit = () => {
    snack(`Adicionando categoria ${name}`, {
      variant: 'info',
      autoHideDuration: 2000
    });

    onAddCategory(name);
    onClose();
  };

  return (
    <div>
      <MuiDialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Adicionar categoria</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <TextField
                value={name}
                autoFocus
                margin="dense"
                id="name"
                label="Nome"
                fullWidth
                onChange={handleNameChange}
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

AddCategoryDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddCategory: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(AddCategoryDialog));
