/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from 'react-redux';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import Datatable from './Datatable';
import DialogContainer from './Dialogs';
import { fetchPrices, getPrices, getPricesQuantity } from 'store/ducks/price';
import { getPriceTableById } from 'store/ducks/priceTable';

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

  const handleRowUpdate = (price, type) => {
    handleOpen(type);
    setPrice(price);
  };

  const handlePriceChange = price => setPrice(price);

  const handleOpen = type => {
    setOpen(true);
    setDialogType(type);
  };

  const handleClose = () => {
    setOpen(false);
    setPrice(null);
  };

  const unitPrice = useSelector(
    store => getPriceTableById(priceTableId, store).unit
  );
  const selectPricesByUnit = store =>
    unitPrice === 'quantidade' ? getPricesQuantity(store) : getPrices(store);
  const data = useSelector(selectPricesByUnit);

  return (
    <>
      <Container maxWidth="xl">
        {open && (
          <DialogContainer
            price={price}
            type={dialogType}
            open={open}
            onClose={handleClose}
            onSetPrice={handlePriceChange}
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
      </Container>
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
