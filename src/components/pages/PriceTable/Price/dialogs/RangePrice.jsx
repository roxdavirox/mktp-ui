/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { addPriceRange } from 'store/ducks/price';
import { getPriceRange } from 'helpers/PriceRange';
import ReactNumberFormat from 'react-number-format';

const styles = theme => ({
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
});

const units = ['m²', 'cm²'];
const unitsObj = {
  'm²': { value: 10000, precoDivisor: 1 },
  'cm²': { value: 1, precoDivisor: 10000 }
};

const RangePrice = ({
  enqueueSnackbar: snack,
  classes,
  onClose,
  priceTableId
}) => {
  const [thickness, setThickness] = useState('');
  const [specificWeigth, setSpecificWeigth] = useState('');
  const [kgPrice, setKgPrice] = useState('');
  const [higherSalesMargin, setHigherSalesMargin] = useState('');
  const [lowerSalesMargin, setLowerSalesMargin] = useState('');
  const [unit, setUnit] = useState('m²'); // inicia em m²
  const dispatch = useDispatch();

  const handleClose = () => onClose();

  const handleSubmit = () => {
    const espessura = thickness.floatValue;
    const pesoEspecifico = specificWeigth.floatValue;
    const precoKg = kgPrice.floatValue;

    const pesoMaterial = (10000 * (espessura / 10) * pesoEspecifico) / 1000;
    console.log(`Peso do material: ${pesoMaterial} kg`);
    const precoM2 = pesoMaterial * precoKg;
    console.log(`Preço do m²: R$ ${precoM2}`);
    const precoCm2 = (precoM2 / 10000).toFixed(4);
    console.log(`Preço do cm²: R$ ${precoCm2}`);

    const maxLines = 30;
    const prices = getPriceRange({
      maxLines,
      priceValue: precoM2,
      higherSalesMargin: higherSalesMargin.floatValue,
      lowerSalesMargin: lowerSalesMargin.floatValue,
      unit: unitsObj[unit].value, // metro ou centimentros quadrados  - cm² m²,
      precoDivisor: unitsObj[unit].precoDivisor
    });
    console.log('prices: ', prices);
    snack('Adicionando intervalo de preços...', {
      variant: 'info',
      autoHideDuration: 4000
    });

    dispatch(addPriceRange(prices, unit, priceTableId, snack));
    handleClose();
  };
  console.log('peso especifico:', specificWeigth);
  return (
    <>
      <DialogTitle id="form-dialog-title">
        Gerar intervalo de preços
      </DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <ReactNumberFormat
              autoFocus
              margin="dense"
              name="thickness"
              id="thickness"
              label="Espessura (mm)"
              fullWidth
              // format
              customInput={TextField}
              value={thickness.formattedValue}
              onValueChange={value => setThickness(value)}
              suffix={' mm'}
              decimalSeparator={','}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <ReactNumberFormat
              id="specificWeigth"
              name="specificWeigth"
              margin="dense"
              label="Peso específico"
              fullWidth
              // format props
              value={specificWeigth.formattedValue}
              customInput={TextField}
              onValueChange={value => setSpecificWeigth(value)}
              suffix={' Kg'}
              decimalSeparator={','}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <ReactNumberFormat
              margin="dense"
              name="kgPrice"
              id="kgPrice"
              label="Preço do KG"
              fullWidth
              // format
              customInput={TextField}
              value={kgPrice.formattedValue}
              prefix={'R$ '}
              fixedDecimalScale
              decimalSeparator={','}
              thousandSeparator={'.'}
              decimalScale={2}
              onValueChange={value => setKgPrice(value)}
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
              onValueChange={value => setHigherSalesMargin(value)}
              value={higherSalesMargin.formattedValue}
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
              value={lowerSalesMargin.formattedValue}
              onValueChange={value => setLowerSalesMargin(value)}
              suffix={'%'}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="unit">
              Unidade de medida dos intervalos
            </InputLabel>
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

RangePrice.propTypes = {
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  priceTableId: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withStyles(styles)(RangePrice);
