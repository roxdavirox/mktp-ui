/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { getPriceRange } from './PriceRange';
import { addPriceRange } from '../actions';

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

class RangePrice extends Component {
  state = {
    thickness: '15',
    specificWeigth: '1.19',
    kgPrice: '15.00',
    higherSalesMargin: '300',
    lowerSalesMargin: '200',
    lowerSaleQuantity: '100000',
    unit: 'm²'
  };

  handleChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  handleSubmit = () => {
    const {
      thickness: espessura,
      specificWeigth: pesoEspecifico,
      kgPrice: precoKg,
      lowerSaleQuantity,
      lowerSalesMargin,
      higherSalesMargin
    } = this.state;

    const { addPriceRange, enqueueSnackbar, priceTableId } = this.props;

    const pesoMaterial = (10000 * (espessura / 10) * pesoEspecifico) / 1000;
    console.log(`Peso do material: ${pesoMaterial} kg`);
    const precoM2 = pesoMaterial * precoKg;
    console.log(`Preço do m²: R$ ${precoM2}`);
    const precoCm2 = (precoM2 / 10000).toFixed(4);
    console.log(`Preço do cm²: R$ ${precoCm2}`);

    const maxLines = 30;
    const prices = getPriceRange({
      lowerSaleQuantity,
      maxLines,
      priceValue: precoM2,
      higherSalesMargin,
      lowerSalesMargin
    });
    console.log('prices: ', prices);
    enqueueSnackbar('Adicionando intervalo de preços...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    addPriceRange(prices, priceTableId, enqueueSnackbar);
    this.props.fnClose();
  };

  render() {
    const { classes } = this.props;
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
                value={this.state.thickness}
                onChange={this.handleChange}
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
                value={this.state.specificWeigth}
                onChange={this.handleChange}
                label="Peso específico"
                fullWidth
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                margin="dense"
                name="kgPrice"
                id="kgPrice"
                value={this.state.kgPrice}
                onChange={this.handleChange}
                label="Preço do KG"
                fullWidth
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                margin="dense"
                name="higherSale"
                id="higherSale"
                value={this.state.higherSalesMargin}
                onChange={this.handleChange}
                label="Maior margem de venda"
                fullWidth
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                margin="dense"
                name="lowerSale"
                id="lowerSale"
                value={this.state.lowerSalesMargin}
                onChange={this.handleChange}
                label="Menor margem de venda"
                fullWidth
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                margin="dense"
                name="lowerSaleQuantity"
                id="lowerSaleQuantity"
                value={this.state.lowerSaleQuantity}
                onChange={this.handleChange}
                label="Quantidade para menor valor de venda"
                fullWidth
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="unit">
                Unidade de medida dos intervalos
              </InputLabel>
              <Select
                className={classes.select}
                value={this.state.unit}
                onChange={this.handleUnitChange}
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
          <Button onClick={this.props.fnClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Gerar
          </Button>
        </DialogActions>
      </>
    );
  }
}

RangePrice.propTypes = {
  fnClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  priceTableId: PropTypes.string.isRequired,
  addPriceRange: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const mapDispatchToProps = { addPriceRange };

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(RangePrice));
