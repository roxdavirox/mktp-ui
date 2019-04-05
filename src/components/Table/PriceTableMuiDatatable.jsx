import React from "react";
import CustomMUIDataTable from "./MuiDatatables";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PricesRangeLoadingSkeleton from "components/LoadingSkeleton/PricesRangeLoadingSkeleton.jsx";
import CustomToolbar from "components/CustomToolbar/CustomToolbar.jsx";
import { withSnackbar } from "notistack";
import CustomSweetAlertInput from "components/CustomSweetAlert/CustomSweetAlertInput.jsx";

import {
  fetchPricesRangeBegin,
  postPriceRangeBegin,
  showAlert,
  hideAlert,
  deletePricesRangeBegin
} from "../../redux/actions/pricesRange.actions";

class PriceTableMuiDatatable extends React.Component {
  state = {
    inputValue: "",
    sweetAlert: (
      <CustomSweetAlertInput
        title="Adicionar Tabela de preço"
        validationMsg="Digite o nome da Tabela de preço"
        onCancel={() => {
          const { hideAlert } = this.props;
          hideAlert();
        }}
        onConfirm={value => this.handleInput(value)}
      />
    ),
    columns: [
      {
        name: "name",
        label: "Nome",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "idPriceRange",
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
      textLabels: {
        body: {
          noMatch: <PricesRangeLoadingSkeleton />
        }
      },
      customToolbar: () => {
        return (
          <CustomToolbar
            title="Adicionar Tabela de preço"
            onClick={() => {
              const { showAlert } = this.props;
              showAlert();
              this.setState({
                inputValue: null
              });
            }}
          />
        );
      },
      onRowsDelete: rowsDeleted => this.handleRowsDelete(rowsDeleted)
    }
  };

  componentDidMount = () => {
    const { fetchPricesRangeBegin } = this.props;
    fetchPricesRangeBegin();
  };

  handleRowsDelete = rows => {
    const {
      deletePricesRangeBegin,
      enqueueSnackbar,
      data: pricesRange
    } = this.props;

    const { data: dataRows } = rows;

    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const deletedPricesRangeIds = indexRows.map(
      index => pricesRange[index].idPriceRange
    );

    const deletedCount = deletedPricesRangeIds.length;
    enqueueSnackbar(
      `Deletando ${deletedCount} tabel${
        deletedCount === 1 ? "a" : "as"
      } de preç${deletedCount === 1 ? "o" : "os"}`,
      {
        variant: "info",
        autoHideDuration: 2000
      }
    );

    deletePricesRangeBegin(deletedPricesRangeIds, enqueueSnackbar);
  };

  handleInput = value => {
    const { postPriceRangeBegin, enqueueSnackbar } = this.props;

    if (value) {
      enqueueSnackbar("Adicionando tabela de preço " + value, {
        variant: "info",
        autoHideDuration: 2000
      });
      postPriceRangeBegin(value, enqueueSnackbar);
      this.setState({ inputValue: value });
    }
  };

  render = () => {
    const { data, openAlert } = this.props;
    const { columns, options, sweetAlert } = this.state;

    return (
      <>
        {openAlert && sweetAlert}
        <CustomMUIDataTable data={data} columns={columns} options={options} />
      </>
    );
  };
}

PriceTableMuiDatatable.propTypes = {
  data: PropTypes.any.isRequired,
  fetchPricesRangeBegin: PropTypes.any.isRequired,
  hideAlert: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
  postPriceRangeBegin: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  openAlert: PropTypes.bool.isRequired,
  deletePricesRangeBegin: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  data: store.pricesRangeState.pricesRange,
  openAlert: store.pricesRangeState.openAlert
});

const hocSnackPriceTable = withSnackbar(PriceTableMuiDatatable);

export default connect(
  mapStateToProps,
  {
    fetchPricesRangeBegin,
    postPriceRangeBegin,
    deletePricesRangeBegin,
    showAlert,
    hideAlert
  }
)(hocSnackPriceTable);
