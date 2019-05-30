import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Datatable from './Datatable';
import { getPriceTables } from './selectors';
import { fetchPriceTables } from './actions';

class Page extends React.Component {
  componentDidMount = () => {
    this.props.fetchPriceTables();
  };

  render = () => {
    return <Datatable data={this.props.data} />;
  };
}

Page.propTypes = {
  data: PropTypes.array.isRequired,
  fetchPriceTables: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  data: getPriceTables(store)
});

const mapDisptachToProps = {
  fetchPriceTables
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(Page);
