/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getItems } from 'components/item/selectors';

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

class ExistingItems extends React.Component {
  handleSubmit = () => {
    this.props.fnExistingItems();
  };

  render = () => {
    const { classes, items, fnSelect, selectedItems } = this.props;
    console.log('items selecionados:', selectedItems);
    return (
      <>
        <DialogTitle id="form-dialog-title">
          Adicionar itens existentes
        </DialogTitle>
        <DialogContent>
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
  };
}

ExistingItems.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  fnSelect: PropTypes.func.isRequired,
  fnClose: PropTypes.func.isRequired,
  fnExistingItems: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired
};

const mapStateToProps = (store, ownProps) => {
  const items = getItems(store);
  const { itemIds } = ownProps;

  const allItems = items.filter(item => itemIds.indexOf(item._id) === -1);

  return {
    items: allItems
  };
};

export default connect(mapStateToProps)(withStyles(styles)(ExistingItems));
