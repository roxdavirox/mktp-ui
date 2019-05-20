import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemDatatable from './Datatable';
import { fetchOptions } from '../option/actions';
import { getOptionsItems } from './selectors';

class PageRedirect extends React.Component {
  componentDidMount = ({ fetchOptions } = this.props) => {
    const pageRefreshed =
      window.performance && performance.navigation.type == 1;
    if (pageRefreshed) {
      fetchOptions();
    }
  };

  render = ({ data } = this.props) => <ItemDatatable data={data} />;
}

PageRedirect.propTypes = {
  data: PropTypes.any.isRequired
};

const mapStateToProps = (store, { optionId }) => ({
  data: getOptionsItems(optionId, store)
});

const mapDispatchToProps = {
  fetchOptions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageRedirect);
