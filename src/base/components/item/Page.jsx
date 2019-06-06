/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { fetchItems, addItem, deleteItems } from './actions';
import Datatable from './Datatable';
import Dialog from './Dialog';
import { getItems } from './selectors';

class Page extends Component {
  state = { open: false };

  componentDidMount = ({ fetchItems } = this.props) => fetchItems();

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleItemNameChange = itemName => this.setState({ itemName });

  handleAddItem = itemName => {
    const { enqueueSnackbar } = this.props;

    enqueueSnackbar('Adicionando item...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    if (itemName) {
      this.props.addItem({ name: itemName }, enqueueSnackbar);
      this.handleClose();
    }
  };

  handleRowsDelete = rows => {
    const { enqueueSnackbar, data } = this.props;

    const { data: dataRows } = rows;
    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const deletedItemsIds = indexRows.map(index => data[index]._id);

    enqueueSnackbar('Deletando...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    this.props.deleteItems(deletedItemsIds, enqueueSnackbar);
  };

  render = () => {
    const { data } = this.props;
    const { open } = this.state;
    return (
      <>
        {open && (
          <Dialog
            open={open}
            fnClose={this.handleClose}
            fnSubmit={this.handleAddItem}
            priceTables={[
              { _id: 123, name: 'Acrilico' },
              { _id: 321, name: 'Base' }
            ]}
          />
        )}
        <Datatable
          data={data}
          fnRowsDelete={this.handleRowsDelete}
          fnOpen={this.handleOpen}
        />
      </>
    );
  };
}

Page.propTypes = {
  data: PropTypes.any.isRequired,
  fetchItems: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  deleteItems: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  data: getItems(store)
});

const mapDispatchToProps = {
  fetchItems,
  addItem,
  deleteItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Page));
