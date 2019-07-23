import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { addPrice } from 'store/ducks/price';

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

const AddPriceDialog = ({
  enqueueSnackbar: snack,
  classes,
  price,
  onClose,
  priceTableId
}) => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (price) {
      setStart(price.start);
      setEnd(price.end);
      setValue(price.value);
    }
  }, []);

  const handleSubmit = () => {
    const price = {
      start: Number(start),
      end: Number(end),
      value: Number(value)
    };

    snack('Adicionando preço...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    dispatch(addPrice(price, priceTableId, snack));
    handleClose();
  };

  const handleClose = () => onClose();

  return (
    <>
      <DialogTitle id="form-dialog-title">Adicionar preço</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <TextField
              autoFocus
              value={this.state.start}
              margin="dense"
              id="start"
              name="start"
              label="Inicio"
              fullWidth
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              value={this.state.end}
              margin="dense"
              id="end"
              name="end"
              label="Fim"
              fullWidth
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              value={this.state.value}
              margin="dense"
              id="value"
              name="value"
              label="Preço"
              fullWidth
              onChange={this.handleChange}
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
    </>
  );
};

AddPriceDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  priceTableId: PropTypes.string.isRequired,
  price: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withStyles(styles)(AddPriceDialog);
