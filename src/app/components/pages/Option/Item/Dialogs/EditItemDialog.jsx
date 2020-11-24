import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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
import { getSortedPriceTables } from 'app/redux/selectors/PriceTable.selectors';
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

const EditItemDialog = ({ item, onEdit, onClose }) => {
  const [itemName, setItemName] = useState('');
  const [priceTable, setPriceTableId] = useState('0');
  const [itemId, setItemId] = useState('');
  const [checked, setCheck] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (item) {
      console.log('item', item);
      setItemName(item.name || '');
      setPriceTableId(item.priceTable || '0');
      setItemId(item._id || '');
      setCheck(item.showUnitField);
    }
    dispatch(fetchPriceTables());
  }, []);

  const handlePriceTableChange = e => setPriceTableId(e.target.value);

  const handleNameChange = e => setItemName(e.target.value);

  const handleSubmit = () => {
    const item = {
      name: itemName,
      priceTable,
      _id: itemId,
      showUnitField: checked
    };
    onEdit(item);
  };

  const handleClose = () => onClose();

  const handleCheck = () => setCheck(value => !value);

  const priceTables = useSelector(store => getSortedPriceTables(store));
  return (
    <>
      <DialogTitle id="form-dialog-title">Editar item</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <TextField
              autoFocus
              value={itemName}
              margin="dense"
              id="name"
              label="Nome"
              fullWidth
              onChange={handleNameChange}
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
              {priceTables &&
                priceTables.map(p => (
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
          Editar
        </Button>
      </DialogActions>
    </>
  );
};

EditItemDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

export default EditItemDialog;
