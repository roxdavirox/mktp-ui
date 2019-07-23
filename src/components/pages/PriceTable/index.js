import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import Datatable from './Datatable';
import AddPriceTableDialog from './AddPriceTableDialog';
import { fetchPriceTables, getPriceTables } from 'store/ducks/priceTable';

// eslint-disable-next-line no-unused-vars
const PriceTablePage = props => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPriceTables());
  }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const data = useSelector(store => getPriceTables(store));
  return (
    <>
      <AddPriceTableDialog open={open} onClose={handleClose} />
      <Datatable data={data} onOpen={handleOpen} />
    </>
  );
};

PriceTablePage.propTypes = {
  data: PropTypes.array.isRequired,
  fetchPriceTables: PropTypes.func.isRequired
};

export default withSnackbar(PriceTablePage);
