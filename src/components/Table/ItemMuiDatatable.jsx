import React from "react";
import CustomMUIDataTable from "./MuiDatatable";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ItemLoadingSkeleton from "components/LoadingSkeleton/ItemLoadingSkeleton.jsx";
import { withSnackbar } from "notistack";

import {
  getItemsByOptionsIdBegin,
  deleteItemsBegin
} from "../../redux/actions/items.actions";
import { fetchPricesRangeBegin } from "../../redux/actions/pricesRange.actions";
import PriceTableSelect from "../CustomSelect/PriceTableSelect";

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
        name: "priceRange",
        label: "Tabela de preço",
        options: {
          sort: true,
          filter: true,
          // eslint-disable-next-line react/display-name
          // eslint-disable-next-line no-unused-vars
          customBodyRender: (value, tableMeta) => <PriceTableSelect />
        }
      },
      {
        name: "idItem",
        options: {
          display: "excluded",
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
      textLabels: {
        body: {
          noMatch: <ItemLoadingSkeleton />
        }
      },
      onRowsDelete: rowsDeleted => this.handleRowsDelete(rowsDeleted)
    }
  };

  componentDidMount = () => {
    const { getItemsByOptionsIdBegin, fetchPricesRangeBegin } = this.props;

    getItemsByOptionsIdBegin();
    fetchPricesRangeBegin();
  };

  handleRowsDelete = rows => {
    const { deleteItemsBegin, enqueueSnackbar, data: items } = this.props;

    const { data: dataRows } = rows;

    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const deletedItemsIds = indexRows.map(index => items[index].idItem);

    deleteItemsBegin(deletedItemsIds, enqueueSnackbar);
  };

  render() {
    const { data } = this.props;
    const { columns, options } = this.state;

    return (
      <div>
        <CustomMUIDataTable
          title={""}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

ItemMuiDatatable.propTypes = {
  getItemsByOptionsIdBegin: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
  deleteItemsBegin: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  fetchPricesRangeBegin: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  data: store.itemsState.items
});

export default connect(
  mapStateToProps,
  { getItemsByOptionsIdBegin, deleteItemsBegin, fetchPricesRangeBegin }
)(withSnackbar(ItemMuiDatatable));
