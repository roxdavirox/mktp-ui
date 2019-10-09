/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import Datatable from './Datatable';
import DialogContainer from './Dialogs';
import { fetchPrices, getPrices } from 'store/ducks/price';

const PricePage = props => {
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState('ADD_PRICE');
  const [price, setPrice] = useState(null);
  const { location } = props;
  const {
    state: { priceTableId }
  } = location;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPrices(priceTableId));
  }, []);

  const handleRowUpdate = price => {
    setOpen(true);
    setDialogType('EDIT_PRICE');
    setPrice(price);
  };

  const handleOpen = type => {
    setOpen(true);
    setDialogType(type);
  };

  const handleClose = () => {
    setOpen(false);
    setPrice(null);
  };

  const data = useSelector(store => getPrices(store));

  return (
    <>
      {open && (
        <DialogContainer
          price={price}
          type={dialogType}
          open={open}
          onClose={handleClose}
          priceTableId={priceTableId}
          {...props}
        />
      )}
      <Datatable
        data={data}
        onOpen={handleOpen}
        onUpdate={handleRowUpdate}
        priceTableId={priceTableId}
        {...props}
      />
    </>
  );
};

PricePage.propTypes = {
  data: PropTypes.array.isRequired,
  priceTableId: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(PricePage);
