import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import Datatable from './Datatable';
import { getPrices } from './selectors';
import { fetchPrices, deletePrices, addPrice } from './actions';
import Dialog from './Dialog';

class Page extends React.Component {
  state = { open: false };

  getPriceTableId = () => {
    const { state } = this.props.location;
    const { priceTableId } = state;
    return priceTableId;
  };

  componentDidMount = () => {
    // from redirect
    const priceTableId = this.getPriceTableId();
    this.props.fetchPrices(priceTableId);
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render = () => {
    const { open } = this.state;
    const priceTableId = this.getPriceTableId();
    return (
      <>
        <Dialog
          {...this.props}
          priceTableId={priceTableId}
          open={open}
          onClose={this.handleClose}
        />
        <Datatable {...this.props} onDialog={this.handleOpen} />
      </>
    );
  };
}

Page.propTypes = {
  data: PropTypes.array.isRequired,
  priceTableId: PropTypes.any.isRequired,
  fetchPrices: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

const mapStateToProps = store => ({
  data: getPrices(store)
});

const mapDisptachToProps = {
  fetchPrices,
  deletePrices,
  onAdd: addPrice
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(withSnackbar(Page));
