import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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

class Dialog extends React.Component {
  state = { itemName: '', priceTable: '' };

  handleNameChange = e => this.setState({ itemName: e.target.value });

  handlePriceTableChange = e =>
    this.setState({ priceTable: Number(e.target.value) });

  handleSubmit = () => {
    const { itemName } = this.state;
    const { fnSubmit } = this.props;
    fnSubmit(itemName);
  };

  handleClose = () => {
    const { fnClose } = this.props;
    fnClose();
  };

  render() {
    const { open, classes, priceTables } = this.props;
    return (
      <div>
        <MuiDialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Cadastrar Item</DialogTitle>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Adicionar
            </Button>
          </DialogActions>
        </MuiDialog>
      </div>
    );
  }
}

Dialog.propTypes = {
  fnClose: PropTypes.func.isRequired,
  fnSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  priceTables: PropTypes.array.isRequired,
  children: PropTypes.object.isRequired
};

export default withStyles(styles)(Dialog);
