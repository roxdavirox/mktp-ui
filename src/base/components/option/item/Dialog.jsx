/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
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
    width: 300,
    minWidth: 120,
    maxWidth: 300
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

class NewItemForm extends React.Component {
  state = { priceTable: '' };

  handlePriceTableChange = e =>
    this.setState({ priceTable: Number(e.target.value) });

  render() {
    const { classes, priceTables, fnChangeName } = this.props;
    return (
      <form className={classes.container}>
        <FormControl className={classes.formControl}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            fullWidth
            onChange={e => fnChangeName(e.target.value)}
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

NewItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
  priceTables: PropTypes.array.isRequired,
  fnChangeName: PropTypes.func.isRequired
};

const ExistingItems = props => {
  const { classes, items, fnSelect, selectedItems } = props;
  console.log('items selecionados:', selectedItems);
  return (
    <form className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple">
          Selecionar itens existentes
        </InputLabel>
        <Select
          multiple
          value={selectedItems}
          onChange={e => fnSelect(e.target.value)}
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
    </form>
  );
};

ExistingItems.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  fnSelect: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired
};

class Dialog extends React.Component {
  handleClose = () => {
    const { fnClose } = this.props;
    fnClose();
  };

  handleSubmit = () => {
    const { fnSubmit } = this.props;
    fnSubmit();
  };

  render() {
    const {
      open,
      mode,
      allItems,
      fnSelect,
      dialogTitle,
      classes,
      priceTables,
      selectedItems,
      fnChangeName
    } = this.props;

    const forms = {
      add: (
        <NewItemForm
          classes={classes}
          fnChangeName={fnChangeName}
          priceTables={priceTables}
        />
      ),
      existing: (
        <ExistingItems
          items={allItems}
          fnSelect={fnSelect}
          classes={classes}
          selectedItems={selectedItems}
        />
      )
    };
    return (
      <div>
        <MuiDialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
          <DialogContent>{forms[mode]}</DialogContent>
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
  mode: PropTypes.string.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  selectedItems: PropTypes.array.isRequired,
  priceTables: PropTypes.array.isRequired,
  allItems: PropTypes.array.isRequired,
  fnChangeName: PropTypes.func.isRequired,
  fnSelect: PropTypes.func.isRequired
};

export default withStyles(styles)(Dialog);
