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

class Form extends React.Component {
  state = { priceTable: '' };

  handlePriceTableChange = e =>
    this.setState({ priceTable: Number(e.target.value) });

  render() {
    const { classes, priceTables, onItemNameChange } = this.props;
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

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  priceTables: PropTypes.array.isRequired,
  onItemNameChange: PropTypes.func.isRequired
};

export default withStyles(styles)(Form);
