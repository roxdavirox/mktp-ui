/* eslint-disable react/display-name */
import React from "react";

import CustomMUIDataTable from "components/Table/MuiDatatables";
import EditIcon from "components/CustomIcons/EditIcon";
import CustomToolbar from "components/CustomToolbar/CustomToolbar.jsx";
// import CustomCircularProgress from "components/CustomCircularProgress/CustomCircularProgress.jsx";
import CustomLoadingSkeleton from "components/LoadingSkeleton/CustomLoadingSkeleton.jsx";
import CustomSweetAlertInput from "components/CustomSweetAlert/CustomSweetAlertInput.jsx";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  postOptionBegin,
  fetchOptionsBegin
} from "../../../redux/actions/options.actions";

class Option extends React.Component {
  state = {
    inputValue: "",
    sweetAlert: null,
    columns: [
      {
        name: "name",
        label: "Name",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "id",
        label: "Edit",
        options: {
          filter: false,
          // eslint-disable-next-line react/display-name
          customBodyRender: (value, tableMeta) => (
            <EditIcon
              key={tableMeta.columnIndex}
              onClick={() => alert(value)}
            />
          )
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
            onClick={() =>
              this.setState({
                sweetAlert: (
                  <CustomSweetAlertInput
                    title="Adicionar opção"
                    validationMsg="Digite o nome da opção"
                    onCancel={() => this.setState({ sweetAlert: null })}
                    onConfirm={value => this.handleInput(value)}
                  />
                ),
                inputValue: null
              })
            }
          />
        );
      },
      onRowsDelete: rowsDeleted => {
        console.log(rowsDeleted);
      }
    }
  };

  handleInput = value => {
    const { postOptionBegin } = this.props;

    if (value) {
      postOptionBegin(value);
      this.setState({ inputValue: value, sweetAlert: null });
    }
  };

  componentDidMount = () => {
    const { fetchOptionsBegin } = this.props;

    fetchOptionsBegin();
  };

  render = () => {
    const { data } = this.props;
    const { columns, options, sweetAlert } = this.state;

    return (
      <div>
        {sweetAlert}
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

Option.propTypes = {
  data: PropTypes.any.isRequired,
  postOptionBegin: PropTypes.func.isRequired,
  fetchOptionsBegin: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  data: store.optionsState.options
});

export default connect(
  mapStateToProps,
  { postOptionBegin, fetchOptionsBegin }
)(Option);
