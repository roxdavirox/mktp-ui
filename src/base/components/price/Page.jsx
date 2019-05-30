import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Datatable from './Datatable';
import { getPriceTables } from './actions';

class Page extends React.Component {
  render() {
    return <Datatable data={this.props.data} />;
  }
}

Page.propTypes = {
  data: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  data: getPriceTables(state)
});

export default connect(mapStateToProps)(Page);
