/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import {
  addOptionItem,
  addExistingItems,
  deleteOptionItems,
  fetchItems
} from 'base/components/item/actions';
import { fetchOptions } from '../actions';
import { getOptionsItems, getItems } from 'base/components/item/selectors';
import Dialog from './Dialog';
import Datatable from './Datatable';

const getOptionId = props => {
  const { state } = props.location;
  const { optionId } = state;
  return optionId;
};

class Page extends React.Component {
  state = { open: false, mode: 'add', itemName: '', selectedItems: [] };

  componentDidMount = ({ fetchOptions, fetchItems } = this.props) => {
    const pageRefreshed =
      window.performance && performance.navigation.type == 1;
    if (pageRefreshed) {
      fetchOptions();
      fetchItems();
    }
  };

  handleOpen = mode => this.setState({ open: true, mode });
  handleClose = () => this.setState({ open: false });
  handleItemNameChange = itemName => this.setState({ itemName });

  handleAddOptionItem = () => {
    const { enqueueSnackbar } = this.props;
    const optionId = getOptionId(this.props);

    enqueueSnackbar('Adicionando item...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    const { itemName } = this.state;

    if (itemName) {
      this.props.addOptionItem({
        name: itemName,
        optionId,
        enqueueSnackbar
      });
      this.handleClose();
    }
  };

  handleExistingItem = () => {
    const { enqueueSnackbar } = this.props;
    const optionId = getOptionId(this.props);

    enqueueSnackbar('Adicionando item(s)...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    const { selectedItems } = this.state;

    if (selectedItems) {
      const itemsId = selectedItems.map(i => i._id);
      console.log('selectedItems:', itemsId);
      console.log('adicionando item na opção:', optionId);
      this.props.addExistingItems(itemsId, optionId, enqueueSnackbar);
      this.handleClose();
    }
  };

  handleSelect = selectedItems => this.setState({ selectedItems });

  handleRowsDelete = rows => {
    const { enqueueSnackbar, data } = this.props;
    const optionId = getOptionId(this.props);

    const { data: dataRows } = rows;
    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const deletedItemsIds = indexRows.map(index => data[index]._id);

    enqueueSnackbar('Deletando...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    this.props.deleteOptionItems(deletedItemsIds, optionId, enqueueSnackbar);
  };

  render = () => {
    const { data, allItems } = this.props;
    const { open, mode, selectedItems } = this.state;

    const dialogHandlers = {
      add: this.handleAddOptionItem,
      existing: this.handleExistingItem
    };
    const dialogTitles = {
      add: 'Adicionar item',
      existing: 'Adicionar itens existentes'
    };

    return (
      <>
        {open && (
          <Dialog
            open={open}
            mode={mode}
            fnClose={this.handleClose}
            dialogTitle={dialogTitles[mode]}
            fnSubmit={dialogHandlers[mode]}
            allItems={allItems}
            fnNameChange={this.handleItemNameChange}
            priceTables={[
              { _id: 123, name: 'Acrilico' },
              { _id: 321, name: 'Base' }
            ]}
            selectedItems={selectedItems}
            fnSelect={this.handleSelect}
          />
        )}
        <Datatable
          data={data}
          fnOpen={this.handleOpen}
          fnRowsDelete={this.handleRowsDelete}
        />
      </>
    );
  };
}

Page.propTypes = {
  data: PropTypes.any.isRequired,
  allItems: PropTypes.any.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  addOptionItem: PropTypes.func.isRequired,
  addExistingItems: PropTypes.func.isRequired,
  optionId: PropTypes.string.isRequired,
  deleteOptionItems: PropTypes.func.isRequired
};

const mapStateToProps = (store, ownProps) => {
  const optionId = getOptionId(ownProps);
  console.log('optionId: ', optionId);

  const data = getOptionsItems(optionId, store);
  const dataIds = data.map(d => d._id);
  const allItems = getItems(store);
  return {
    data,
    allItems: allItems.filter(item => dataIds.indexOf(item._id) === -1)
  };
};

const mapDispatchToProps = {
  fetchOptions,
  addOptionItem,
  addExistingItems,
  fetchItems,
  deleteOptionItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Page));
