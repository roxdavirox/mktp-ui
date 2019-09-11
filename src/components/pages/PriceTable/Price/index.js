/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import Datatable from './Datatable';
import Dialog from './Dialog';
import { fetchPrices, getPrices } from 'store/ducks/price';

const PricePage = props => {
  const [open, setOpen] = useState(false);
  const [mode, setDialogMode] = useState('add');
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
    setDialogMode('edit');
    setPrice(price);
  };

  const handleOpen = mode => {
    setOpen(true);
    setDialogMode(mode);
  };

  const handleClose = () => {
    setOpen(false);
    setPrice(null);
  };

  const data = useSelector(store => getPrices(store));

  return (
    <>
      {open && (
        <Dialog
          price={price}
          mode={mode}
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
        {...props}
      />
    </>
  );
};

PricePage.propTypes = {
  data: PropTypes.array.isRequired,
  priceTableId: PropTypes.string.isRequired,
  fetchPrices: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(PricePage);
