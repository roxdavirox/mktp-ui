import React from "react";

import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";

const MuiDatatable = ({ title, data, columns, options }) => (
  <MUIDataTable
    title={title ? title : ""}
    data={data}
    columns={columns}
    options={options}
  />
);

MuiDatatable.propTypes = {
  title: PropTypes.any,
  data: PropTypes.any.isRequired,
  columns: PropTypes.any.isRequired,
  options: PropTypes.any.isRequired
};

export default MuiDatatable;
