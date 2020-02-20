import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { addPriceTable } from 'app/redux/actions/PriceTable.actions';

const units = ['m²', 'cm²', 'quantidade'];

const styles = theme => ({
  container: {
    display: 'grid',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

const Dialog = ({ enqueueSnackbar: snack, classes, open, onClose }) => {
  const [priceTableName, setPriceTableName] = useState('');
  const [unit, setUnit] = useState('m²'); // inicia em m²
  const dispatch = useDispatch();

  const handleNameChange = e => setPriceTableName(e.target.value);

  const handleSubmit = () => {
    snack('Adicionando preço...', {
      variant: 'info',
      autoHideDuration: 2000
    });
    dispatch(addPriceTable(priceTableName, unit, snack));
    handleClose();
  };

  const handleClose = () => onClose();

  return (
    <div>
      <MuiDialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Cadastrar tabela de preço
        </DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nome"
                fullWidth
                onChange={handleNameChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="unit">Unidade da tabela de preço</InputLabel>
              <Select
                className={classes.select}
                value={unit}
                onChange={e => setUnit(e.target.value)}
                input={<Input id="unit" />}
              >
                {units.map(u => (
                  <MenuItem key={u} value={u}>
                    {u}
                  </MenuItem>
                ))}
              </Select>
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

Dialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withStyles(styles)(Dialog);
