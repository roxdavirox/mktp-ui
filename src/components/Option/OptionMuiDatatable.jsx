import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import { Link } from "react-router-dom";

//Common components
import MuiDatatable from "../../Common/Tables/MuiDatatable";

//Theme components
import MoreHorizIcon from "components/Common/Icons/MoreHorizIcon.jsx";
import Toolbar from "components/Common/Tables/Toolbar.jsx";
import CustomSweetAlertInput from "components/Theme/CustomSweetAlert/CustomSweetAlertInput.jsx";

import OptionLoading from "./OptionLoadingSkeleton";

import {
  postOptionBegin,
  toggleOptionItems,
  deleteOptionsBegin,
  fetchOptionsBegin,
  showAlert,
  hideAlert
} from "../../../redux/actions/options";
import { getOptions } from "../../../redux/selectors/options";

import { openFormDialog } from "../../../redux/actions/items";

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
        name: "_id",
        label: " ",
        options: {
          sort: false,
          filter: false,
          // eslint-disable-next-line react/display-name
          customBodyRender: (value, tableMeta) => (
            <Link to="/admin/configuration/item">
              <MoreHorizIcon
                key={tableMeta.columnIndex}
                onClick={() => {
                  const { toggleOptionItems } = this.props;
                  toggleOptionItems(value);
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
      textLabels: {
        body: {
          noMatch: <OptionLoading />
        }
      },
      customToolbar: () => {
        return (
          <Toolbar
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
    const { deleteOptionsBegin, enqueueSnackbar, options } = this.props;

    const { data: dataRows } = rows;

    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const deletedOptionsIds = indexRows.map(index => options[index].id);

    deleteOptionsBegin(deletedOptionsIds, enqueueSnackbar);
  };

  handleInput = value => {
    const { postOptionBegin, enqueueSnackbar } = this.props;

    if (value) {
      enqueueSnackbar("Adicionando opção " + value, {
        variant: "info",
        autoHideDuration: 2000
      });
      postOptionBegin(value, enqueueSnackbar);
      this.setState({ inputValue: value });
    }
  };

  componentDidMount = () => {
    const { fetchOptionsBegin } = this.props;

    fetchOptionsBegin();
  };

  render = () => {
    const { options: data, openAlert } = this.props;
    const { columns, options, sweetAlert } = this.state;

    return (
      <div>
        {openAlert && sweetAlert}
        <MuiDatatable
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
  options: PropTypes.any.isRequired,
  postOptionBegin: PropTypes.func.isRequired,
  fetchOptionsBegin: PropTypes.func.isRequired,
  deleteOptionsBegin: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  openAlert: PropTypes.any.isRequired,
  showAlert: PropTypes.any.isRequired,
  hideAlert: PropTypes.any.isRequired,
  enqueueSnackbar: PropTypes.any.isRequired,
  openFormDialog: PropTypes.any.isRequired,
  toggleOptionItems: PropTypes.func.isRequired
};

const wrappedMuiDatatable = withSnackbar(
  withStyles(optionStyle)(OptionMuiDataTable)
);

const mapStateToProps = store => {
  const { openAlert } = store.options;
  const options = getOptions(store);

  return {
    openAlert,
    options
  };
};

const mapDispatchtoProps = {
  postOptionBegin,
  toggleOptionItems,
  deleteOptionsBegin,
  fetchOptionsBegin,
  showAlert,
  hideAlert,
  openFormDialog
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(wrappedMuiDatatable);
