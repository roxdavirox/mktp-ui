/* eslint-disable no-console */
import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import Datatable from './Datatable';
import { getPrices } from './selectors';
import { fetchPrices, deletePrices } from './actions';
import Dialog from './Dialog';

const getPriceTableId = props => {
  const { state } = props.location;
  const { priceTableId } = state;
  return priceTableId;
};

class Page extends React.Component {
  state = { open: false, mode: 'add', price: null, prices: [] };

  componentDidMount = () => {
    // from redirect
    const { fetchPrices, priceTableId } = this.props;
    fetchPrices(priceTableId);
  };

  handleRowUpdate = price => {
    this.setState({ open: true, mode: 'edit', price });
    console.log('preço dentro do handleRowUpdate:', price);
  };

  handleOpen = mode => this.setState({ open: true, mode });

  handleClose = () => this.setState({ open: false, price: null });
  handleTestData = prices => this.setState({ prices });
  render = () => {
    const { state, props } = this;
    const { open } = state;

    return (
      <>
        {open && (
          <Dialog
            fnPrices={this.handleTestData}
            {...props}
            {...state}
            fnClose={this.handleClose}
          />
        )}
        <Datatable
          prices={this.state.prices}
          fnOpen={this.handleOpen}
          fnUpdate={this.handleRowUpdate}
          {...props}
        />
      </>
    );
  };
}

Page.propTypes = {
  data: PropTypes.array.isRequired,
  priceTableId: PropTypes.string.isRequired,
  fetchPrices: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  addPrice: PropTypes.func.isRequired,
  editPrice: PropTypes.func.isRequired,
  deletePrices: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = (store, ownProps) => ({
  data: getPrices(store),
  priceTableId: getPriceTableId(ownProps)
});

const mapDisptachToProps = {
  fetchPrices,
  deletePrices
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(withSnackbar(Page));
