import React from "react";

import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";

const CustomMUIDataTable = ({ title, data, columns, options }) => (
  <MUIDataTable
    title={title ? title : ""}
    data={data}
    columns={columns}
    options={options}
  />
);

CustomMUIDataTable.propTypes = {
  title: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
  columns: PropTypes.any.isRequired,
  options: PropTypes.any.isRequired
};

export default CustomMUIDataTable;
