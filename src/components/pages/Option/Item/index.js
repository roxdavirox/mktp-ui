/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withSnackbar } from 'notistack';
import Dialog from './Dialog';
import Datatable from './Datatable';
import { fetchOptions } from 'store/ducks/option';
import {
  addOptionItem,
  addExistingItems,
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
  const [mode, setDialogMode] = useState('add');
  const [item, setItem] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
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

  const handleOpen = mode => {
    setOpen(true);
    setDialogMode(mode);
  };

  const handleClose = () => {
    setOpen(false);
    setItem(null);
    setSelectedItems([]);
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

  const handleExistingItem = () => {
    if (selectedItems.length <= 0) {
      snack('Nenhum item selecionado!', {
        variant: 'error',
        autoHideDuration: 2000
      });
      handleClose();
      return;
    }

    snack('Adicionando item(s)...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    const itemsId = selectedItems.map(i => i._id);
    console.log('selectedItems:', itemsId);
    console.log('adicionando item na opção:', optionId);
    dispatch(addExistingItems(itemsId, optionId, snack));
    handleClose();
  };

  const handleUpdate = item => {
    setOpen(true);
    setDialogMode('edit');
    setItem(item);
  };

  const handleSelect = items => setSelectedItems(items);

  const handleRowsDelete = rows => {
    const { data: dataRows } = rows;
    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const deletedItemsIds = indexRows.map(index => data[index]._id);

    snack('Deletando...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    dispatch(deleteOptionItems(deletedItemsIds, optionId, snack));
  };

  const data = useSelector(store => getOptionsItems(optionId, store));
  const itemsId = data.map(item => item._id);
  return (
    <>
      {open && (
        <Dialog
          selectedItems={selectedItems}
          open={open}
          onExistingItems={handleExistingItem}
          onSelect={handleSelect}
          onClose={handleClose}
          mode={mode}
          item={item}
          onEdit={handleEditItem}
          onAddOptionItem={handleAddOptionItem}
          itemsId={itemsId}
        />
      )}
      <Datatable
        data={data}
        onUpdate={handleUpdate}
        onOpen={handleOpen}
        onRowsDelete={handleRowsDelete}
      />
    </>
  );
};

OptionItemPage.propTypes = {
  data: PropTypes.any.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  addOptionItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  addExistingItems: PropTypes.func.isRequired,
  optionId: PropTypes.string.isRequired,
  deleteOptionItems: PropTypes.func.isRequired,
  priceTables: PropTypes.array.isRequired,
  location: PropTypes.object
};

export default withSnackbar(OptionItemPage);
