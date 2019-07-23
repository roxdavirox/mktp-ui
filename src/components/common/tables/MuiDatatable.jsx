import React from 'react';

import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';

const MuiDatatable = props => <MUIDataTable {...props} />;

MuiDatatable.propTypes = {
  title: PropTypes.any,
  data: PropTypes.any.isRequired,
  columns: PropTypes.any.isRequired,
  options: PropTypes.any.isRequired
};

export default MuiDatatable;
