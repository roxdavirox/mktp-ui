/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import Datatable from './Datatable';
import Dialog from './Dialog';
import {
  fetchItems,
  addItem,
  editItem,
  deleteItems,
  getItems
} from 'store/ducks/item';
import { getPriceTables } from 'store/ducks/priceTable';

class ItemPage extends Component {
  state = { open: false, mode: 'add', item: {} };

  componentDidMount = ({ fetchItems } = this.props) => fetchItems();

  handleOpen = () => this.setState({ open: true, mode: 'add' });

  handleClose = () => this.setState({ open: false, item: null });

  handleItemNameChange = itemName => this.setState({ itemName });

  handleAdd = item => {
    const { addItem, enqueueSnackbar: snack } = this.props;

    snack('Adicionando item...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    const { _id, ...rest } = item;

    const newItem = { ...rest };

    addItem(newItem, snack);
    this.handleClose();
  };

  handleEdit = item => {
    const { enqueueSnackbar: snack, editItem } = this.props;
    console.log('item:', item);

    snack('Editando item...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    editItem(item, snack);
    this.handleClose();
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

  handleUpdate = item => {
    this.setState({ open: true, mode: 'edit', item });
  };

  render = () => {
    const handlers = {
      add: this.handleAdd,
      edit: this.handleEdit
    };
    const buttonTexts = { add: 'Adicionar', edit: 'Editar' };
    const titles = { add: 'Adicionar item', edit: 'Editar item ' };

    const { data } = this.props;
    const { open, mode, item } = this.state;
    return (
      <>
        {open && (
          <Dialog
            open={open}
            dialogTitle={titles[mode]}
            buttonText={buttonTexts[mode]}
            fnClose={this.handleClose}
            fnSubmit={handlers[mode]}
            item={item}
            {...this.props}
          />
        )}
        <Datatable
          data={data}
          fnRowsDelete={this.handleRowsDelete}
          fnOpen={this.handleOpen}
          fnUpdate={this.handleUpdate}
        />
      </>
    );
  };
}

ItemPage.propTypes = {
  data: PropTypes.any.isRequired,
  fetchItems: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  deleteItems: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  data: getItems(store),
  priceTables: getPriceTables(store)
});

const mapDispatchToProps = {
  fetchItems,
  addItem,
  deleteItems,
  editItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(ItemPage));
