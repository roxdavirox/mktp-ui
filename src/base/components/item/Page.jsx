/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchItems } from './actions';
import ItemDatatable from './Datatable';
import FormDialog from './FormDialog';
import { getItems } from './selectors';

class Page extends Component {
  state = { open: false };
  componentDidMount = ({ fetchItems } = this.props) => fetchItems();

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  render = ({ data } = this.props) => {
    return (
      <>
        <FormDialog open={this.state.open} onClose={this.handleClose} />
        <ItemDatatable data={data} onAddItem={this.handleOpen} />
      </>
    );
  };
}

Page.propTypes = {
  data: PropTypes.any.isRequired,
  fetchItems: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  data: getItems(store)
});

const mapDispatchToProps = {
  fetchItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
