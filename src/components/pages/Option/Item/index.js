/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withSnackbar } from 'notistack';
import DialogContainer from './Dialogs';
import Datatable from './Datatable';
import { fetchOptions } from 'store/ducks/option';
import {
  addOptionItem,
  deleteOptionItems,
  fetchItems,
  editItem,
  getOptionsItems
} from 'store/ducks/item';
// import { getPriceTables } from 'store/ducks/priceTable';

const getOptionId = location => {
  const { state } = location;
  const { optionId } = state;
  return optionId;
};

const OptionItemPage = ({ enqueueSnackbar: snack, location }) => {
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState('ADD_ITEM');
  const [item, setItem] = useState({});
  const dispatch = useDispatch();
  const optionId = getOptionId(location);

  useEffect(() => {
    const pageRefreshed =
      window.performance && performance.navigation.type == 1;
    if (pageRefreshed) {
      dispatch(fetchOptions());
      dispatch(fetchItems());
    }
  }, []);

  const handleOpen = dialogType => {
    setOpen(true);
    setDialogType(dialogType);
  };

  const handleClose = () => {
    setOpen(false);
    setItem(null);
  };

  const handleAddOptionItem = item => {
    snack('Adicionando item...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    if (item) {
      dispatch(addOptionItem(item, optionId, snack));
      handleClose();
    }
  };

  const handleEditItem = item => {
    snack('Atualizando item...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    dispatch(editItem(item, snack));
    handleClose();
  };

  const handleUpdate = item => {
    setOpen(true);
    setDialogType('EDIT_ITEM');
    setItem(item);
  };

  const handleRowsDelete = rows => {
    const { data: dataRows } = rows;
    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const deletedItemsIds = indexRows.map(index => items[index]._id);

    snack('Deletando...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    dispatch(deleteOptionItems(deletedItemsIds, optionId, snack));
  };

  const items = useSelector(store => getOptionsItems(optionId, store));

  return (
    <>
      {open && (
        <DialogContainer
          open={open}
          onClose={handleClose}
          type={dialogType}
          item={item}
          onEdit={handleEditItem}
          onAddOptionItem={handleAddOptionItem}
        />
      )}
      <Datatable
        data={items}
        onUpdate={handleUpdate}
        onOpen={handleOpen}
        onRowsDelete={handleRowsDelete}
      />
    </>
  );
};

OptionItemPage.propTypes = {
  items: PropTypes.any.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  addOptionItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  optionId: PropTypes.string.isRequired,
  deleteOptionItems: PropTypes.func.isRequired,
  priceTables: PropTypes.array.isRequired,
  location: PropTypes.object
};

export default withSnackbar(OptionItemPage);
