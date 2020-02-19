import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { addOption } from 'app/redux/actions/Option.actions';

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

const Dialog = ({ enqueueSnackbar: snack, classes, onClose, open }) => {
  const [optionName, setOptionName] = useState('');
  const dispatch = useDispatch();

  const handleNameChange = e => setOptionName(e.target.value);

  const handleSubmit = () => {
    snack(`Adicionando opção ${optionName}`, {
      variant: 'info',
      autoHideDuration: 2000
    });

    dispatch(addOption(optionName, snack));
    handleClose();
  };

  const handleClose = () => onClose();

  const handleEnterKey = e => {
    if (e.keyCode == 13) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div>
      <MuiDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Adicionar Opção</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <TextField
                value={optionName}
                autoFocus
                margin="dense"
                id="name"
                label="Nome"
                fullWidth
                onChange={handleNameChange}
                onKeyDown={handleEnterKey}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
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

Dialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dialog);
