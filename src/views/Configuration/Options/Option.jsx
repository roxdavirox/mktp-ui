/* eslint-disable react/display-name */
import React from "react";

import CustomMUIDataTable from "components/Table/MuiDatatables";
import EditIcon from "components/CustomIcons/EditIcon";
import CustomToolbar from "./CustomToolbar";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchOptionsBegin } from "../../../redux/actions/options.actions";

const columns = [
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
        <EditIcon key={tableMeta.columnIndex} onClick={() => alert(value)} />
      )
    }
  }
];

const options = {
  filterType: "checkbox",
  textLabels: {
    body: {
      noMatch: "Nenhuma opção carregada"
    }
  },
  customToolbar: () => {
    return (
      <CustomToolbar
        title="Adicionar Opção"
        onClick={() => alert("Botao de add clicado!")}
      />
    );
  }
};

class Option extends React.Component {
  componentDidMount = () => {
    const { fetchOptionsBegin } = this.props;

    fetchOptionsBegin();
  };

  render = () => {
    const { data } = this.props;

    return (
      <div>
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
  fetchOptionsBegin: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  data: store.optionsState.options
});

export default connect(
  mapStateToProps,
  { fetchOptionsBegin }
)(Option);
