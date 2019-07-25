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

const RangePrice = ({
  enqueueSnackbar: snack,
  classes,
  onClose,
  priceTableId
}) => {
  const [thickness, setThickness] = useState('15');
  const [specificWeigth, setSpecificWeigth] = useState('1.19');
  const [kgPrice, setKgPrice] = useState('15.00');
  const [higherSalesMargin, setHigherSalesMargin] = useState('300');
  const [lowerSalesMargin, setLowerSalesMargin] = useState('200');
  const [unit, setUnit] = useState('m²');
  const dispatch = useDispatch();

  const handleClose = () => onClose();

  const handleSubmit = () => {
    const espessura = thickness;
    const pesoEspecifico = specificWeigth;
    const precoKg = kgPrice;

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
      higherSalesMargin,
      lowerSalesMargin
    });
    console.log('prices: ', prices);
    snack('Adicionando intervalo de preços...', {
      variant: 'info',
      autoHideDuration: 4000
    });

    dispatch(addPriceRange(prices, priceTableId, snack));
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
            <TextField
              autoFocus
              margin="dense"
              name="thickness"
              value={thickness}
              onChange={e => setThickness(e.target.value)}
              id="thickness"
              label="Espessura (mm)"
              fullWidth
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              margin="dense"
              id="specificWeigth"
              name="specificWeigth"
              value={specificWeigth}
              onChange={e => setSpecificWeigth(e.target.value)}
              label="Peso específico"
              fullWidth
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              margin="dense"
              name="kgPrice"
              id="kgPrice"
              value={kgPrice}
              onChange={e => setKgPrice(e.target.value)}
              label="Preço do KG"
              fullWidth
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              margin="dense"
              name="higherSale"
              id="higherSale"
              value={higherSalesMargin}
              onChange={e => setHigherSalesMargin(e.target.value)}
              label="Maior margem de venda"
              fullWidth
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              margin="dense"
              name="lowerSale"
              id="lowerSale"
              value={lowerSalesMargin}
              onChange={e => setLowerSalesMargin(e.target.value)}
              label="Menor margem de venda"
              fullWidth
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
              <MenuItem value="">
                <em>Nenhum</em>
              </MenuItem>
              {['m²'].map(unit => (
                <MenuItem key={unit} value={unit}>
                  {unit}
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
