import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import ReactNumberFormat from 'react-number-format';
import { generatePriceRange } from './GeneratePriceQty.js';
import { addPriceRange } from 'store/ducks/price';
import { getPriceTableById } from 'store/ducks/priceTable';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    flexWrap: 'wrap',
    width: 300
  },
  formControl: {
    margin: theme.spacing.unit - 5,
    minWidth: 120
  },
  select: { height: '37px', width: '80px' }
}));

const GeneratePriceQty = ({ onClose, enqueueSnackbar, priceTableId }) => {
  const classes = useStyles();
  const [cost, setPriceCost] = useState('');
  const [maiorMargemVenda, setMaiorMargemVenda] = useState('');
  const [menorMargemVenda, setMenorMargemVenda] = useState('');
  const dispatch = useDispatch();
  const priceTable = useSelector(store =>
    getPriceTableById(priceTableId, store)
  );
  const handleClose = () => onClose();
  const handleSubmit = () => {
    const prices = generatePriceRange(
      cost.floatValue,
      menorMargemVenda.floatValue,
      maiorMargemVenda.floatValue
    );
    const { unit } = priceTable;
    dispatch(addPriceRange(prices, unit, priceTableId, enqueueSnackbar));
    handleClose();
  };

  return (
    <>
      <DialogTitle id="form-dialog-title">
        Gerar intervalo de preços
      </DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <ReactNumberFormat
              margin="dense"
              name="cost"
              id="cost"
              label="Preço de Custo"
              fullWidth
              // format
              customInput={TextField}
              value={cost.formattedValue}
              prefix={'R$ '}
              fixedDecimalScale
              decimalSeparator={','}
              thousandSeparator={'.'}
              decimalScale={2}
              onValueChange={value => setPriceCost(value)}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <ReactNumberFormat
              margin="dense"
              name="higherSale"
              id="higherSale"
              label="Maior margem de venda"
              fullWidth
              // format
              customInput={TextField}
              onValueChange={value => setMaiorMargemVenda(value)}
              value={maiorMargemVenda.formattedValue}
              suffix={'%'}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <ReactNumberFormat
              margin="dense"
              name="lowerSale"
              id="lowerSale"
              label="Menor margem de venda"
              fullWidth
              // format
              customInput={TextField}
              value={menorMargemVenda.formattedValue}
              onValueChange={value => setMenorMargemVenda(value)}
              suffix={'%'}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Gerar
        </Button>
      </DialogActions>
    </>
  );
};

GeneratePriceQty.propTypes = {
  onClose: PropTypes.func,
  enqueueSnackbar: PropTypes.func,
  priceTableId: PropTypes.string
};

export default GeneratePriceQty;
