/* eslint-disable no-console */
import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import Datatable from './Datatable';
import { getPrices } from './selectors';
import { fetchPrices, deletePrices, addPrice } from './actions';
import Dialog from './Dialog';

const getPriceTableId = props => {
  const { state } = props.location;
  const { priceTableId } = state;
  return priceTableId;
};

class Page extends React.Component {
  state = { open: false, mode: 'add', price: null };

  componentDidMount = () => {
    // from redirect
    const priceTableId = getPriceTableId(this.props);
    this.props.fetchPrices(priceTableId);
  };

  handleAdd = price => {
    const { addPrice, enqueueSnackbar } = this.props;
    const priceTableId = getPriceTableId(this.props);

    enqueueSnackbar('Adicionando preço...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    addPrice(price, priceTableId, enqueueSnackbar);
  };

  handleEdit = price => {
    const { editPrice, enqueueSnackbar } = this.props;
    const priceTableId = getPriceTableId(this.props);

    enqueueSnackbar('Editando preço...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    editPrice(price, priceTableId, enqueueSnackbar);
  };

  handleUpdate = price => {
    this.setState({ open: true, mode: 'update', price });
    console.log('preço dentro do handleUpdate:', price);
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render = () => {
    const { open, mode, price } = this.state;
    const priceTableId = getPriceTableId(this.props);
    const add = mode == 'add';

    return (
      <>
        <Dialog
          {...this.props}
          priceTableId={priceTableId}
          open={open}
          onClose={this.handleClose}
          fnSubmit={add ? this.handleAdd : this.handleEdit}
          dialogTitle={add ? 'Adicionar preço' : 'Editar preço'}
          buttonText={add ? 'Adicionar' : 'Editar'}
          price={price}
        />
        <Datatable
          {...this.props}
          onDialog={this.handleOpen}
          fnUpdate={this.handleUpdate}
        />
      </>
    );
  };
}

Page.propTypes = {
  data: PropTypes.array.isRequired,
  priceTableId: PropTypes.any.isRequired,
  fetchPrices: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  addPrice: PropTypes.func.isRequired,
  deletePrices: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  data: getPrices(store)
});

const mapDisptachToProps = {
  fetchPrices,
  deletePrices,
  addPrice
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(withSnackbar(Page));
