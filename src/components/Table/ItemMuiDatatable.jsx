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
        name: "idItem",
        label: "Tabela de preço",
        options: {
          display: "true",
          sort: false,
          filter: false,
          // eslint-disable-next-line react/display-name
          // eslint-disable-next-line no-unused-vars
          customBodyRender: (value, tableMeta) => {
            const { items } = this.props;

            const { rowIndex: index } = tableMeta;

            const { idItem, idPriceRange } = items[index];

            return (
              <PriceTableSelect
                idItem={idItem}
                idPriceRange={idPriceRange}
                itemIndex={index}
              />
            );
          }
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
