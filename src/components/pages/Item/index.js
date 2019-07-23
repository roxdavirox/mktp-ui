/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import Datatable from './Datatable';
import Dialog from './Dialog';
import {
  fetchItems,
  addItem,
  editItem,
  deleteItems,
  getItems
} from 'store/ducks/item';
import { getPriceTables } from 'store/ducks/priceTable';

const ItemPage = props => {
  const [open, setOpen] = useState(false);
  const [mode, setDialogMode] = useState('add');
  const [item, setItem] = useState({});
  const data = useSelector(store => getItems(store));
  const priceTables = useSelector(store => getPriceTables(store));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setDialogMode('add');
  };

  const handleClose = () => {
    setOpen(false);
    setItem(null);
  };

  const handleAdd = item => {
    const { enqueueSnackbar: snack } = props;

    snack('Adicionando item...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    const { _id, ...rest } = item;

    const newItem = { ...rest };

    dispatch(addItem(newItem, snack));
    handleClose();
  };

  const handleEdit = item => {
    const { enqueueSnackbar: snack } = props;

    snack('Editando item...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    dispatch(editItem(item, snack));
    handleClose();
  };

  const handleRowsDelete = rows => {
    const { enqueueSnackbar } = props;

    const { data: dataRows } = rows;
    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const deletedItemsIds = indexRows.map(index => data[index]._id);

    enqueueSnackbar('Deletando...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    dispatch(deleteItems(deletedItemsIds, enqueueSnackbar));
  };

  const handleUpdate = item => {
    setOpen(true);
    setDialogMode('edit');
    setItem(item);
  };

  const handlers = {
    add: handleAdd,
    edit: handleEdit
  };
  const buttonTexts = { add: 'Adicionar', edit: 'Editar' };
  const titles = { add: 'Adicionar item', edit: 'Editar item ' };

  return (
    <>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          onSubmit={handlers[mode]}
          dialogTitle={titles[mode]}
          buttonText={buttonTexts[mode]}
          item={item}
          priceTables={priceTables}
          {...props}
        />
      )}
      <Datatable
        data={data}
        onRowsDelete={handleRowsDelete}
        onOpen={handleOpen}
        onUpdate={handleUpdate}
      />
    </>
  );
};

ItemPage.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(ItemPage);
