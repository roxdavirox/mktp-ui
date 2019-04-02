import React from "react";
import CustomMUIDataTable from "./MuiDatatables";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import BallotIcon from "components/CustomIcons/BallotIcon";
import CustomToolbar from "components/CustomToolbar/CustomToolbar.jsx";
import CustomLoadingSkeleton from "components/LoadingSkeleton/CustomLoadingSkeleton.jsx";
import CustomSweetAlertInput from "components/CustomSweetAlert/CustomSweetAlertInput.jsx";
import CustomEditOptionDialog from "components/CustomDialog/CustomEditOptionDialog.jsx";

import {
  postOptionBegin,
  deleteOptionsBegin,
  fetchOptionsBegin,
  showAlert,
  hideAlert
} from "../../redux/actions/options.actions";

import { openFormDialog } from "../../redux/actions/items.actions";

const optionStyle = {
  EditCell: { textAlign: "right" },
  NameCell: { fontWeight: 500 }
};

class OptionMuiDataTable extends React.Component {
  state = {
    inputValue: "",
    sweetAlert: (
      <CustomSweetAlertInput
        title="Adicionar opção"
        validationMsg="Digite o nome da opção"
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
        label: "Name",
        options: {
          filter: true,
          sort: true,
          setCellProps: () => {
            return {
              className: classNames({ [this.props.classes.NameCell]: true })
            };
          }
        }
      },
      {
        name: "id",
        label: " ",
        options: {
          sort: false,
          filter: false,
          // eslint-disable-next-line react/display-name
          customBodyRender: (value, tableMeta) => (
            <BallotIcon
              key={tableMeta.columnIndex}
              onClick={() => {
                const { openFormDialog } = this.props;
                openFormDialog(value);
              }}
            />
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
      textLabels: {
        body: {
          noMatch: <CustomLoadingSkeleton />
        }
      },
      customToolbar: () => {
        return (
          <CustomToolbar
            title="Adicionar Opção"
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

  handleRowsDelete = rows => {
    const { deleteOptionsBegin, enqueueSnackbar, data: options } = this.props;

    const { data: dataRows } = rows;

    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const deletedOptionsIds = indexRows.map(index => options[index].id);

    deleteOptionsBegin(deletedOptionsIds, enqueueSnackbar);
  };

  handleInput = value => {
    const { postOptionBegin, enqueueSnackbar } = this.props;

    if (value) {
      enqueueSnackbar("Adicionando opção " + value);
      postOptionBegin(value, enqueueSnackbar);
      this.setState({ inputValue: value });
    }
  };

  componentDidMount = () => {
    const { fetchOptionsBegin } = this.props;

    fetchOptionsBegin();
  };

  render = () => {
    const { data, openAlert } = this.props;
    const { columns, options, sweetAlert } = this.state;

    return (
      <div>
        {openAlert && sweetAlert}
        <CustomEditOptionDialog />
        <CustomMUIDataTable
          title={"Opções"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    );
  };
}

OptionMuiDataTable.propTypes = {
  data: PropTypes.any.isRequired,
  postOptionBegin: PropTypes.func.isRequired,
  fetchOptionsBegin: PropTypes.func.isRequired,
  deleteOptionsBegin: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  openAlert: PropTypes.any.isRequired,
  showAlert: PropTypes.any.isRequired,
  hideAlert: PropTypes.any.isRequired,
  enqueueSnackbar: PropTypes.any.isRequired,
  openFormDialog: PropTypes.any.isRequired,
  openDialog: PropTypes.any.isRequired
};

const mapStateToProps = store => ({
  data: store.optionsState.options,
  openAlert: store.optionsState.openAlert,
  openDialog: store.itemsState.openDialog
});

const wrappedMuiDatatable = withSnackbar(
  withStyles(optionStyle)(OptionMuiDataTable)
);

export default connect(
  mapStateToProps,
  {
    postOptionBegin,
    deleteOptionsBegin,
    fetchOptionsBegin,
    showAlert,
    hideAlert,
    openFormDialog
  }
)(wrappedMuiDatatable);
