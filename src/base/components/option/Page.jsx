/* eslint-disable react/display-name */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';

import { fetchOptions } from './actions';
import Datatable from './Datatable';
import Dialog from './Dialog';
import { getOptions } from './selectors';

class OptionPage extends Component {
  state = { open: false };

  componentDidMount = () => {
    this.props.fetchOptions();
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { data, ...rest } = this.props;
    const { open } = this.state;
    return (
      <>
        {open && <Dialog open={open} fnClose={this.handleClose} {...rest} />}
        <Datatable data={data} fnOpen={this.handleOpen} />
      </>
    );
  }
}

OptionPage.propTypes = {
  fetchOptions: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired
};

const mapStateToProps = store => {
  const data = getOptions(store);
  return {
    data,
    openAlert: store.options.openAlert
  };
};

const mapDispatchToProps = {
  fetchOptions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(OptionPage));
