/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
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
import { getItems } from 'store/ducks/item';

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

const ExistingItems = props => {
  const handleSubmit = () => {
    const { onExistingItems } = props;
    onExistingItems();
  };

  const handleClose = () => {
    const { onClose } = props;
    onClose();
  };
  const { classes, onSelect, selectedItems } = props;

  const items = useSelector(store => getItems(store));
  const { itemsId } = props;
  const allItems = items.filter(item => itemsId.indexOf(item._id) === -1);
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
              onChange={e => onSelect(e.target.value)}
              input={<Input id="select-multiple" />}
              MenuProps={MenuProps}
            >
              {allItems.map(item => (
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
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Adicionar
        </Button>
      </DialogActions>
    </>
  );
};

ExistingItems.propTypes = {
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onExistingItems: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired,
  itemsId: PropTypes.array.isRequired
};

export default withStyles(styles)(ExistingItems);
