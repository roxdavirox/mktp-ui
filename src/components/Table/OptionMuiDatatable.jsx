import React from "react";
import CustomMUIDataTable from "./MuiDatatables";

const OptionMuiDataTable = () => (
  <CustomMUIDataTable
    title={"Opções"}
    data={data}
    columns={columns}
    options={options}
  />
);

export default OptionMuiDataTable;
