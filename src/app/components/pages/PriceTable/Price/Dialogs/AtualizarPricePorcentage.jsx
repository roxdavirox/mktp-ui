/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import ReactNumberFormat from 'react-number-format';
//redux
import { atualizarIntervalos } from 'app/redux/actions/Price.actions';

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

const AtualizarIntervalosPorcentage = ({
  enqueueSnackbar: snack,
  classes,
  onClose,
  priceTableId
}) => {
  const [porcentage, setPorcentage] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    snack('Atualizando Intervalos...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    dispatch(atualizarIntervalos(porcentage.floatValue, priceTableId, snack));
    handleClose();
  };

  const handleClose = () => onClose();
  return (
    <>
      <DialogTitle id="form-dialog-title">Atulaizar intervalos</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <ReactNumberFormat
            margin="dense"
            id="Percentage"
            name="Percentage"
            label="Porcentagem"
            fullWidth
            // format
            customInput={TextField}
            fixedDecimalScale
            decimalSeparator={','}
            thousandSeparator={'.'}
            decimalScale={1}
            onValueChange={_value => setPorcentage(_value)}
          />
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

AtualizarIntervalosPorcentage.propTypes = {
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object,
  priceTableId: PropTypes.string.isRequired,
  price: PropTypes.object,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withStyles(styles)(AtualizarIntervalosPorcentage);
