import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class FormRedirect extends React.Component {
  state = { priceTable: '', itemsSelected: [] };

  handlePriceTableChange = e =>
    this.setState({ priceTable: Number(e.target.value) });

  handleItemChange = e =>
    this.setState({
      itemsSelected: e.target.value
    });

  render() {
    console.log('items:', this.state.itemsSelected);
    const { classes, priceTables, items, onItemNameChange } = this.props;
    return (
      <form className={classes.container}>
        <FormControl className={classes.formControl}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            fullWidth
            onChange={e => onItemNameChange(e.target.value)}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple">
            Selecionar itens existentes
          </InputLabel>
          <Select
            multiple
            value={this.state.itemsSelected}
            onChange={this.handleItemChange}
            input={<Input id="select-multiple" />}
            MenuProps={MenuProps}
          >
            {items.map(item => (
              <MenuItem
                key={item._id}
                value={item}
                style={{ fontWeight: 'fontWeigthMedium' }}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="price-table-input">Tabela de preço</InputLabel>
          <Select
            className={classes.select}
            value={this.state.priceTable}
            onChange={this.handlePriceTableChange}
            input={<Input id="price-table-input" />}
          >
            <MenuItem value="">
              <em>Nenhum</em>
            </MenuItem>
            {priceTables.map(p => (
              <MenuItem key={p._id} value={p._id}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

FormRedirect.propTypes = {
  classes: PropTypes.object.isRequired,
  priceTables: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  onItemNameChange: PropTypes.func.isRequired
};

export default withStyles(styles)(FormRedirect);
