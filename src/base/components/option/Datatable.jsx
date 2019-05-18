import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
//Common components
import MuiDatatable from "base/components/common/tables/MuiDatatable";
//Theme components
import MoreHorizIcon from "base/components/common/icons/MoreHorizIcon.jsx";
import Toolbar from "base/components/common/tables/Toolbar.jsx";
import OptionLoading from "./LoadingSkeleton";
import { toggleOptionItems } from "../item/actions";
import { deleteOptionsBegin } from "./actions";

const optionStyle = {
  EditCell: { textAlign: "right" },
  NameCell: { fontWeight: 500 }
};

class DataTable extends React.Component {
  handleRowsDelete = rows => {
    const { deleteOptionsBegin, enqueueSnackbar, data } = this.props;

    const { data: dataRows } = rows;

    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const deletedOptionsIds = indexRows.map(index => data[index]._id);

    deleteOptionsBegin(deletedOptionsIds, enqueueSnackbar);
  };

  render = () => {
    const { data, onDialog } = this.props;
    const columns = [
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
            <Link to="/admin/config/item">
              <MoreHorizIcon
                key={tableMeta.columnIndex}
                onClick={() => {
                  this.props.toggleOptionItems(value);
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
    ];
    const options = {
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
        return <Toolbar title="Adicionar Opção" onClick={onDialog} />;
      },
      onRowsDelete: rowsDeleted => this.handleRowsDelete(rowsDeleted)
    };

    return (
      <MuiDatatable
        title={"Opções"}
        data={data}
        columns={columns}
        options={options}
      />
    );
  };
}

DataTable.propTypes = {
  data: PropTypes.any.isRequired,
  deleteOptionsBegin: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.any.isRequired,
  toggleOptionItems: PropTypes.func.isRequired,
  onDialog: PropTypes.func.isRequired
};

const mapDispatchtoProps = {
  toggleOptionItems,
  deleteOptionsBegin
};

export default connect(
  null,
  mapDispatchtoProps
)(withStyles(optionStyle)(DataTable));
