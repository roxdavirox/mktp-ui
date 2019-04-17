import React from "react";
import CustomMUIDataTable from "./MuiDatatable";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchPricesBegin,
  clearPrices,
  openPriceDialog,
  deletePricesBegin
} from "../../redux/actions/prices.actions";
import { getPrices } from "../../redux/selectors/prices.selectors";
import { Redirect } from "react-router-dom";
import PriceLoadingSkeleton from "components/LoadingSkeleton/PriceLoadingSkeleton.jsx";
import CustomToolbar from "components/CustomToolbar/CustomToolbar.jsx";
import CustomPriceDialog from "components/CustomDialog/CustomPriceDialog.jsx";
import { withSnackbar } from "notistack";

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
      },
      customToolbar: () => {
        return (
          <CustomToolbar
            title="Adicionar Preço"
            onClick={() => {
              const { openPriceDialog } = this.props;
              openPriceDialog();
            }}
          />
        );
      },
      onRowsDelete: rowsDeleted => this.handleRowsDelete(rowsDeleted)
    }
  };

  handleRowsDelete = rows => {
    const { deletePricesBegin, enqueueSnackbar, prices } = this.props;

    const { data: dataRows } = rows;

    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const deletedPricesIds = indexRows.map(index => prices[index].idPrice);

    deletePricesBegin(deletedPricesIds, enqueueSnackbar);
  };

  componentDidMount = () => {
    const { idPriceRange, fetchPricesBegin } = this.props;

    if (!idPriceRange) return;

    fetchPricesBegin();
  };

  componentWillUnmount = () => {
    const { clearPrices } = this.props;
    clearPrices();
  };

  renderRedirect = () => {
    const { idPriceRange } = this.props;

    if (!idPriceRange) {
      return <Redirect to="/admin" />;
    }
  };

  render = () => {
    const { prices, titlePriceRange } = this.props;
    const { columns, options } = this.state;

    return (
      <>
        {this.renderRedirect()}
        <CustomPriceDialog />
        <CustomMUIDataTable
          title={titlePriceRange}
          data={prices}
          columns={columns}
          options={options}
        />
      </>
    );
  };
}

PriceMuiDatatable.propTypes = {
  prices: PropTypes.any.isRequired,
  idPriceRange: PropTypes.any.isRequired,
  fetchPricesBegin: PropTypes.func.isRequired,
  clearPrices: PropTypes.func.isRequired,
  openPriceDialog: PropTypes.func.isRequired,
  titlePriceRange: PropTypes.string.isRequired,
  deletePricesBegin: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const snackedPrice = withSnackbar(PriceMuiDatatable);

const mapStateToProps = store => {
  const { prices: state } = store;
  const { idPriceRange, titlePriceRange } = state;
  const prices = getPrices(store);

  return {
    prices,
    idPriceRange,
    titlePriceRange
  };
};

const mapDispatchToProps = {
  fetchPricesBegin,
  clearPrices,
  openPriceDialog,
  deletePricesBegin
};

const connectedPrice = connect(
  mapStateToProps,
  mapDispatchToProps
)(snackedPrice);

export default connectedPrice;
