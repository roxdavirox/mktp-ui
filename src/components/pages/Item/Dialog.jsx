import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
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
import { fetchPriceTables } from 'store/ducks/priceTable';

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

const Dialog = props => {
  const [itemName, setItemName] = useState('');
  const [priceTableId, setPriceTableId] = useState('0');
  const [itemId, setItemId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const { item } = props;
    if (item) {
      setPriceTableId(item.priceTableId || '0');
      setItemName(item.name || '');
      setItemId(item._id || '');
    }
    dispatch(fetchPriceTables());
  }, []);

  const handleNameChange = e => setItemName(e.target.value);

  const handlePriceTableChange = e => setPriceTableId(e.target.value);

  const handleSubmit = () => {
    const item = { name: itemName, priceTableId, _id: itemId };
    props.onSubmit(item);
  };

  const handleClose = () => props.onClose();

  const { open, dialogTitle, buttonText, classes, priceTables } = props;
  return (
    <div>
      <MuiDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <TextField
                value={itemName}
                autoFocus
                margin="dense"
                id="name"
                label="Nome"
                fullWidth
                onChange={handleNameChange}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="price-table-input">
                Tabela de preço
              </InputLabel>
              <Select
                className={classes.select}
                value={priceTableId}
                onChange={handlePriceTableChange}
                input={<Input id="price-table-input" />}
              >
                <MenuItem key="0" value="0">
                  Nenhum
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
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {buttonText}
          </Button>
        </DialogActions>
      </MuiDialog>
    </div>
  );
};

Dialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  priceTables: PropTypes.array.isRequired,
  children: PropTypes.object.isRequired,
  fetchPriceTables: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
};

export default withStyles(styles)(Dialog);
