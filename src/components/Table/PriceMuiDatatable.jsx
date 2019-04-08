import React from "react";
import CustomMUIDataTable from "./MuiDatatable";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPricesBegin } from "../../redux/actions/prices.actions";
import { Redirect } from "react-router-dom";
import PriceLoadingSkeleton from "components/LoadingSkeleton/PriceLoadingSkeleton.jsx";

class PriceMuiDatatable extends React.Component {
  state = {
    columns: [
      {
        name: "start",
        label: "Inicio",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "end",
        label: "Fim",
        options: {
          sort: true,
          filter: true
        }
      },
      {
        name: "value",
        label: "Valor",
        options: {
          sort: false,
          filter: false
        }
      },
      {
        name: "idPrice",
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
          noMatch: <PriceLoadingSkeleton />
        }
      }
      // onRowsDelete: rowsDeleted => this.handleRowsDelete(rowsDeleted)
    }
  };

  componentDidMount = () => {
    const { fetchPricesBegin } = this.props;

    fetchPricesBegin();
  };

  renderRedirect = () => {
    const { idPriceRange } = this.props;

    if (!idPriceRange) {
      return <Redirect to="/admin" />;
    }
  };

  render = () => {
    const { data } = this.props;
    const { columns, options } = this.state;

    return (
      <>
        {this.renderRedirect()}
        <CustomMUIDataTable data={data} columns={columns} options={options} />
      </>
    );
  };
}

PriceMuiDatatable.propTypes = {
  data: PropTypes.any.isRequired,
  idPriceRange: PropTypes.any.isRequired,
  fetchPricesBegin: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    data: store.pricesState.prices,
    idPriceRange: store.pricesState.idPriceRange
  };
};

export default connect(
  mapStateToProps,
  { fetchPricesBegin }
)(PriceMuiDatatable);
