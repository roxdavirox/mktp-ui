/* eslint-disable react/display-name */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';

import { postOption, fetchOptions, showAlert, hideAlert } from './actions';
import SweetAlert from 'base/components/theme/CustomSweetAlert/CustomSweetAlertInput.jsx';
import Datatable from './Datatable';
import { getOptions } from './selectors';

class OptionPage extends Component {
  componentDidMount = () => {
    this.props.fetchOptions();
  };

  handleInput = value => {
    if (!value) return;

    const { enqueueSnackbar } = this.props;

    enqueueSnackbar('Adicionando opção ' + value, {
      variant: 'info',
      autoHideDuration: 2000
    });

    this.props.postOption(value, enqueueSnackbar);
    this.setState({ inputValue: value });
  };

  render() {
    const { data, openAlert, showAlert, hideAlert } = this.props;

    return (
      <>
        {openAlert ? (
          <SweetAlert
            title="Adicionar opção"
            validationMsg="Digite o nome da opção"
            onCancel={() => hideAlert()}
            onConfirm={value => this.handleInput(value)}
          />
        ) : null}
        <Datatable data={data} onDialog={() => showAlert()} />
      </>
    );
  }
}

OptionPage.propTypes = {
  postOption: PropTypes.func.isRequired,
  fetchOptions: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
  openAlert: PropTypes.bool.isRequired,
  showAlert: PropTypes.func.isRequired,
  hideAlert: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  const data = getOptions(store);
  return {
    data,
    openAlert: store.options.openAlert
  };
};

const mapDispatchToProps = {
  fetchOptions,
  postOption,
  showAlert,
  hideAlert
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(OptionPage));
