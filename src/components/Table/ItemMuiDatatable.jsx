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
import { getItems } from "../../redux/selectors/items.selectors";
import { fetchPricesRangeBegin } from "../../redux/actions/pricesRange.actions";
// import PriceTableSelect from "../CustomSelect/PriceTableSelect";

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
      textLabels: {
        body: {
          noMatch: <ItemLoadingSkeleton />
        }
      },
      onRowsDelete: rowsDeleted => this.handleRowsDelete(rowsDeleted)
    }
  };

  componentDidMount = () => {
    //
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
        <CustomMUIDataTable
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
  enqueueSnackbar: PropTypes.func.isRequired,
  fetchPricesRangeBegin: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  items: getItems(store)
});

const mapPropsToDispatch = {
  getItemsByOptionsIdBegin,
  deleteItemsBegin,
  fetchPricesRangeBegin
};

export default connect(
  mapStateToProps,
  mapPropsToDispatch
)(withSnackbar(ItemMuiDatatable));
