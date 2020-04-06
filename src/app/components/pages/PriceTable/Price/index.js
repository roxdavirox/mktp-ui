/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from 'react-redux';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'matx';
import Datatable from './Datatable';
import DialogContainer from './Dialogs';
import {
  getPrices,
  getPricesQuantity
} from 'app/redux/selectors/Price.selectors';
import { fetchPrices } from 'app/redux/actions/Price.actions';
import { getPriceTableById } from 'app/redux/selectors/PriceTable.selectors';
import { useParams } from 'react-router-dom';

const PricePage = props => {
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState('ADD_PRICE');
  const [price, setPrice] = useState(null);

  const { id: priceTableId } = useParams();
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
      <Container maxWidth="xl" className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: 'Tabelas de preço', path: '/price-tables' },
              { name: 'Preços' }
            ]}
          />
        </div>
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
