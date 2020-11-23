import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
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
import { fetchPriceTables } from 'app/redux/actions/PriceTable.actions';
import { getPriceTables } from 'app/redux/selectors/PriceTable.selectors';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
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
}));

const AddItemDialog = ({ onAddOptionItem, onClose }) => {
  const [itemName, setItemName] = useState('');
  const [priceTable, setPriceTable] = useState('0');
  const [checked, setCheck] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchPriceTables());
  }, []);

  const handleNameChange = e => {
    e.preventDefault();
    setItemName(e.target.value);
  };

  const handleEnterKey = e => {
    if (e.keyCode == 13) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePriceTableChange = e => {
    e.preventDefault();
    setPriceTable(e.target.value);
  };

  const handleSubmit = () => {
    const item = { name: itemName, priceTable, showUnitField: checked };

    onAddOptionItem(item);
  };

  const handleCheck = () => setCheck(state => !state);

  const handleClose = () => onClose();
  const priceTables = useSelector(store => getPriceTables(store));

  const sortedPricetables = priceTables.sort((a, b) =>
    b.name > a.name ? -1 : 1
  );

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
              onChange={handleNameChange}
              onKeyDown={handleEnterKey}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="price-table-input">Tabela de preço</InputLabel>
            <Select
              className={classes.select}
              value={priceTable}
              onChange={handlePriceTableChange}
              input={<Input id="price-table-input" />}
            >
              <MenuItem key="0" value="0">
                Nenhum
              </MenuItem>
              {sortedPricetables.map(p => (
                <MenuItem key={p._id} value={p._id}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <InputLabel htmlFor="check">
              <Checkbox
                checked={checked}
                onClick={handleCheck}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              Marque para informar a unidade no calculo do preço final
            </InputLabel>
          </div>
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

AddItemDialog.propTypes = {
  onAddOptionItem: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddItemDialog;
