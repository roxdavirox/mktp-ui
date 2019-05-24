/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

const ExistingOptionItemsForm = props => {
  const { classes, items, onSelect, selectedItems } = props;
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
          onChange={onSelect}
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

ExistingOptionItemsForm.propTypes = {
  classes: PropTypes.object.isRequired,
  priceTables: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired
};

export default withStyles(styles)(ExistingOptionItemsForm);
