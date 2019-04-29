import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withSnackbar } from "notistack";

import MuiDatatable from "components/App/Common/Tables/MuiDatatable";

// redux
import { getItemsByOptionsIdBegin, deleteItemsBegin } from "./itemActions";
import { getItemsOption } from "./itemSelector";

class ItemMuiDatatable extends React.Component {
  state = {
    columns: [
      {
        name: "name",
        label: "Item",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "minValue",
        label: "Menor preço de venda",
        options: {
          display: "true",
          sort: false,
          filter: false
        }
      },
      {
        name: "maxValue",
        label: "Maior preço de venda",
        options: {
          display: "true",
          sort: false,
          filter: false
        }
      },
      {
        name: "minQuantity",
        label: "Menor quantidade de venda",
        options: {
          display: "true",
          sort: false,
          filter: false
        }
      },
      {
        name: "interval",
        label: "intervalo",
        options: {
          display: "true",
          sort: false,
          filter: false
        }
      },
      {
        name: "_id",
        label: " ",
        options: {
          display: "false",
          sort: false,
          filter: false
        }
      }
    ],
    options: {
      filterType: "checkbox",
      download: false,
      print: false,
      filter: false,
      viewColumns: false,
      rowHover: false,
      rowsPerPageOptions: [5, 10, 15],
      rowsPerPage: 5,
      responsive: "stacked",
      onRowsDelete: rowsDeleted => this.handleRowsDelete(rowsDeleted)
    }
  };

  handleRowsDelete = rows => {
    const { deleteItemsBegin, enqueueSnackbar, items } = this.props;

    const { data: dataRows } = rows;

    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const deletedItemsIds = indexRows.map(index => items[index].idItem);

    deleteItemsBegin(deletedItemsIds, enqueueSnackbar);
  };

  render() {
    const { items } = this.props;
    const { columns, options } = this.state;
    return (
      <div>
        <MuiDatatable
          title={""}
          data={items}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

ItemMuiDatatable.propTypes = {
  getItemsByOptionsIdBegin: PropTypes.func.isRequired,
  items: PropTypes.any.isRequired,
  deleteItemsBegin: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  items: getItemsOption(store)
});

const mapPropsToDispatch = {
  getItemsByOptionsIdBegin,
  deleteItemsBegin
};

export default connect(
  mapStateToProps,
  mapPropsToDispatch
)(withSnackbar(ItemMuiDatatable));
