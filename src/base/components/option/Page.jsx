/* eslint-disable react/display-name */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withSnackbar } from "notistack";

import { postOption, fetchOptions } from "./actions";
import SweetAlert from "base/components/theme/CustomSweetAlert/CustomSweetAlertInput.jsx";
import Datatable from "./Datatable";
import { getOptions } from "./selectors";

class OptionPage extends Component {
  state = {
    openAlert: false
  };

  componentDidMount = () => {
    this.props.fetchOptions();
  };

  handleInput = value => {
    const { enqueueSnackbar } = this.props;

    if (value) {
      enqueueSnackbar("Adicionando opção " + value, {
        variant: "info",
        autoHideDuration: 2000
      });

      this.props.postOption(value, enqueueSnackbar);
      this.setState({ inputValue: value });
    }
  };

  render() {
    const { data } = this.props;

    return (
      <>
        {this.state.openAlert ? (
          <SweetAlert
            title="Adicionar opção"
            validationMsg="Digite o nome da opção"
            onCancel={() => this.setState({ openAlert: false })}
            onConfirm={value => this.handleInput(value)}
          />
        ) : null}
        <Datatable
          data={data}
          onDialog={() => this.setState({ openAlert: true })}
        />
      </>
    );
  }
}

OptionPage.propTypes = {
  postOption: PropTypes.func.isRequired,
  fetchOptions: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired
};

const mapStateToProps = store => {
  const data = getOptions(store);
  return {
    data
  };
};

const mapDispatchToProps = {
  fetchOptions,
  postOption
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(OptionPage));
