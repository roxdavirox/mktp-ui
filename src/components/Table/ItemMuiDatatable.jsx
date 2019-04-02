import React from "react";
import CustomMUIDataTable from "./MuiDatatables";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ItemLoadingSkeleton from "components/LoadingSkeleton/ItemLoadingSkeleton.jsx";

import { getItemsByOptionsIdBegin } from "../../redux/actions/items.actions";

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
          sort: false,
          filter: false,
          // eslint-disable-next-line react/display-name
          // eslint-disable-next-line no-unused-vars
          customBodyRender: (value, tableMeta) => (
            <h6>Selecionar tabela de preço</h6>
          )
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
      }
      // onRowsDelete: rowsDeleted => this.handleRowsDelete(rowsDeleted)
    }
  };

  componentDidMount = () => {
    const { getItemsByOptionsIdBegin } = this.props;

    getItemsByOptionsIdBegin();
  };

  render() {
    const { data } = this.props;
    const { columns, options } = this.state;

    return (
      <div>
        <CustomMUIDataTable
          title={"Itens"}
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
  data: PropTypes.any.isRequired
};

const mapStateToProps = store => ({
  data: store.itemsState.items
});

export default connect(
  mapStateToProps,
  { getItemsByOptionsIdBegin }
)(ItemMuiDatatable);
