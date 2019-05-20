/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchItems } from './actions';
import ItemDatatable from './Datatable';

import { getItems } from './selectors';

class Page extends Component {
  componentDidMount = ({ fetchItems }) => fetchItems();

  render = ({ data }) => <ItemDatatable data={data} />;
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
