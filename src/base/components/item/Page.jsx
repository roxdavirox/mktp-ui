/* eslint-disable react/display-name */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';

import ItemDatatable from './Datatable';
import { getItems } from './selectors';
// redux
import { deleteItems } from './actions';

class ItemPage extends Component {
  componentDidMount = () => {
    const { needFetch } = this.props;

    if (needFetch) {
      this.props.fetchItems();
    }
  };

  handleRowsDelete = rows => {
    const { enqueueSnackbar, data } = this.props;

    const { data: dataRows } = rows;

    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const deletedItemsIds = indexRows.map(index => data[index].idItem);

    this.props.deleteItems(deletedItemsIds, enqueueSnackbar);
  };

  render = () => {
    return <ItemDatatable onRowsDelete={this.handleRowsDelete} />;
  };
}

ItemPage.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  needFetch: PropTypes.bool.isRequired,
  data: PropTypes.any.isRequired,
  deleteItems: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  data: getItems(store),
  needFetch: store.optionId === null
});

const mapPropsToDispatch = {
  deleteItems
};

const snackItemPage = withSnackbar(ItemPage);

export default connect(
  mapStateToProps,
  mapPropsToDispatch
)(snackItemPage);
