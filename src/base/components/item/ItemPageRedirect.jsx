import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ItemDatatable from './Datatable';

import { getOptionsItems } from './selectors';

const PageRedirect = ({ data }) => <ItemDatatable data={data} />;

const mapStateToProps = store => ({
  data: getOptionsItems(store)
});

PageRedirect.propTypes = {
  data: PropTypes.any.isRequired
};

export default connect(mapStateToProps)(PageRedirect);
