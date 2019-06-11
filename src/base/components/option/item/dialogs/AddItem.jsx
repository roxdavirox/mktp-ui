import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getPriceTables } from 'base/components/priceTable/selectors';
import { fetchPriceTables } from 'base/components/priceTable/actions';

const styles = theme => ({
  container: {
    display: 'grid',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 300,
    minWidth: 120,
    maxWidth: 300
  },
  select: { height: '37px' }
});

class AddItem extends React.Component {
  state = { itemName: '', priceTableId: '' };

  componentDidMount = () => {
    const { fetchPriceTables } = this.props;
    fetchPriceTables();
  };

  handleNameChange = e =>
    this.setState({
      itemName: e.target.value
    });

  handlePriceTableChange = e => this.setState({ priceTableId: e.target.value });

  handleSubmit = () => {
    const { itemName: name, priceTableId } = this.state;

    const { fnAdd } = this.props;
    const item = { name, priceTableId };

    fnAdd(item);
  };

  render() {
    const { classes, priceTables } = this.props;
    return (
      <>
        <DialogTitle id="form-dialog-title">Adicionar item</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nome"
                fullWidth
                onChange={this.handleNameChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="price-table-input">
                Tabela de preço
              </InputLabel>
              <Select
                className={classes.select}
                value={this.state.priceTableId}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.fnClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </>
    );
  }
}

AddItem.propTypes = {
  classes: PropTypes.object.isRequired,
  priceTables: PropTypes.array.isRequired,
  fetchPriceTables: PropTypes.func.isRequired,
  fnAdd: PropTypes.func.isRequired,
  fnClose: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  priceTables: getPriceTables(store)
});

const mapDispatchToPros = {
  fetchPriceTables
};

export default connect(
  mapStateToProps,
  mapDispatchToPros
)(withStyles(styles)(AddItem));
