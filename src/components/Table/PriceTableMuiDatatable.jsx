import React from "react";
import { Redirect, Link } from "react-router-dom";
import CustomMUIDataTable from "./MuiDatatable";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PricesRangeLoadingSkeleton from "components/LoadingSkeleton/PricesRangeLoadingSkeleton.jsx";
import CustomToolbar from "components/CustomToolbar/CustomToolbar.jsx";
import { withSnackbar } from "notistack";
import CustomSweetAlertInput from "components/CustomSweetAlert/CustomSweetAlertInput.jsx";
import BallotIcon from "components/CustomIcons/BallotIcon";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

import {
  fetchPricesRangeBegin,
  postPriceRangeBegin,
  showAlert,
  hideAlert,
  deletePricesRangeBegin
} from "../../redux/actions/pricesRange.actions";

import { setPriceRangeId } from "../../redux/actions/prices.actions";

const priceStyle = {
  EditCell: { textAlign: "right" }
};

class PriceTableMuiDatatable extends React.Component {
  state = {
    redirect: false,
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
        label: " ",
        options: {
          sort: false,
          filter: false,
          customBodyRender: (value, tableMeta) => (
            <Link to="/admin/configuration/price">
              <BallotIcon
                key={tableMeta.columnIndex}
                onClick={() => {
                  const { setPriceRangeId } = this.props;
                  this.setState({ redirect: true });
                  const { rowData } = tableMeta;
                  const titlePriceRange = rowData[0];
                  setPriceRangeId(value, titlePriceRange);
                }}
              />
            </Link>
          ),
          setCellProps: () => {
            return {
              className: classNames({ [this.props.classes.EditCell]: true })
            };
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
  deletePricesRangeBegin: PropTypes.func.isRequired,
  setPriceRangeId: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  data: store.pricesRangeState.pricesRange,
  openAlert: store.pricesRangeState.openAlert
});

const priceStyled = withStyles(priceStyle)(PriceTableMuiDatatable);

const hocSnackPriceTable = withSnackbar(priceStyled);

export default connect(
  mapStateToProps,
  {
    fetchPricesRangeBegin,
    postPriceRangeBegin,
    deletePricesRangeBegin,
    showAlert,
    hideAlert,
    setPriceRangeId
  }
)(hocSnackPriceTable);
