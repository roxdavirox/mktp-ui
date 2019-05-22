import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
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

class FormDialog extends React.Component {
  state = { priceTable: '', inputName: '' };

  handleChange = e => this.setState({ priceTable: Number(e.target.value) });

  render() {
    const { classes, open, onClose, onAddItem, priceTables } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={onClose}
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
                  onChange={e => this.setState({ inputName: e.target.value })}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="price-table-input">
                  Tabela de preço
                </InputLabel>
                <Select
                  className={classes.select}
                  value={this.state.priceTable}
                  onChange={this.handleChange}
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
            <Button onClick={onClose} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => onAddItem(this.state.inputName)}
              color="primary"
            >
              Adicionar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

FormDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  priceTables: PropTypes.any.isRequired
};

export default withStyles(styles)(FormDialog);
