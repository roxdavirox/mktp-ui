import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
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
      <Container maxWidth="xl">
        <AddPriceTableDialog open={open} onClose={handleClose} {...props} />
        <Datatable data={data} onOpen={handleOpen} {...props} />
      </Container>
    </>
  );
};

PriceTablePage.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(PriceTablePage);
