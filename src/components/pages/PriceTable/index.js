import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import Datatable from './Datatable';
import Dialog from './Dialog';
import {
  fetchPriceTables,
  deletePriceTables,
  addPriceTable,
  getPriceTables
} from 'store/ducks/priceTable';

class PriceTablePage extends React.Component {
  state = { open: false };

  componentDidMount = () => {
    this.props.fetchPriceTables();
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render = () => {
    const { open } = this.state;
    return (
      <>
        <Dialog {...this.props} open={open} onClose={this.handleClose} />
        <Datatable {...this.props} onDialog={this.handleOpen} />
      </>
    );
  };
}

PriceTablePage.propTypes = {
  data: PropTypes.array.isRequired,
  fetchPriceTables: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  data: getPriceTables(store)
});

const mapDisptachToProps = {
  fetchPriceTables,
  deletePriceTables,
  onAdd: addPriceTable
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(withSnackbar(PriceTablePage));
