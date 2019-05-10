import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withSnackbar } from "notistack";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MuiDatatable from "components/app/common/tables/MuiDatatable";
import Toolbar from "components/app/common/tables/Toolbar.jsx";

// redux
import { getItemsByOptionsIdBegin, deleteItemsBegin } from "./itemActions";
import { getItems } from "./itemSelector";

class ItemMuiDatatable extends React.Component {
  state = {
    anchorEl: null,
    openMenu: false,
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
          noMatch: "Nenhum item"
        }
      },
      customToolbar: () => {
        return (
          <div>
            <Toolbar
              title="Adicionar Item"
              onClick={e => this.setState({ anchorEl: e.currentTarget })}
              aria-owns="add-menu"
              aria-haspopup="true"
            />
            <Menu
              id="add-menu"
              anchorEl={this.anchorEl}
              open={this.state.anchorEl || false}
              onClose={() => this.setState({ anchorEl: null })}
            >
              <MenuItem>oi</MenuItem>
            </Menu>
          </div>
        );
      },
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
    const { props, state } = this;
    const { options, columns } = state;
    return <MuiDatatable {...props} options={options} columns={columns} />;
  }
}

ItemMuiDatatable.propTypes = {
  getItemsByOptionsIdBegin: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
  deleteItemsBegin: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  data: getItems(store)
});

const mapPropsToDispatch = {
  getItemsByOptionsIdBegin,
  deleteItemsBegin
};

export default connect(
  mapStateToProps,
  mapPropsToDispatch
)(withSnackbar(ItemMuiDatatable));
