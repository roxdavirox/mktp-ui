import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withSnackbar } from "notistack";
import MuiDatatable from "base/components/common/tables/MuiDatatable";
import Toolbar from "base/components/common/tables/Toolbar.jsx";

// redux
import { getItemsByOptionsIdBegin, deleteItemsBegin } from "./actions";
import { getItems } from "./selectors";

const columns = [
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
];

class Datatable extends React.Component {
  state = {
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
          noMatch: "Nenhum item"
        }
      },
      customToolbar: () => {
        return (
          <>
            <Toolbar
              title="Adicionar Item"
              onClick={e => console.log("click no add item")}
              aria-owns="add-menu"
              aria-haspopup="true"
            />
          </>
        );
      },
      onRowsDelete: rowsDeleted => this.handleRowsDelete(rowsDeleted)
    }
  };

  handleRowsDelete = rows => {
    const { deleteItemsBegin, enqueueSnackbar, data } = this.props;

    const { data: dataRows } = rows;

    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const deletedItemsIds = indexRows.map(index => data[index].idItem);

    deleteItemsBegin(deletedItemsIds, enqueueSnackbar);
  };

  render() {
    const { props, state } = this;
    const { options } = state;
    return (
      <div>
        <MuiDatatable {...props} options={options} />{" "}
      </div>
    );
  }
}

Datatable.propTypes = {
  getItemsByOptionsIdBegin: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
  deleteItemsBegin: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  data: getItems(store),
  columns
});

const mapPropsToDispatch = {
  getItemsByOptionsIdBegin,
  deleteItemsBegin
};

export default connect(
  mapStateToProps,
  mapPropsToDispatch
)(withSnackbar(Datatable));
