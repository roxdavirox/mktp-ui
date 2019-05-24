import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import ItemDatatable from './Datatable';
import { addOptionItem, fetchItems, NEW_ITEM, EXISTING_ITEM } from './actions';
import { fetchOptions } from '../option/actions';
import { getOptionsItems, getItems } from './selectors';
import Dialog from './Dialog';
import NewOptionItemForm from './forms/NewOptionItemForm';
import ExistingOptionItemsForm from './forms/ExistingOptionItemsForm';
import {
  AddToolbar,
  BallotToolbar
} from 'base/components/common/tables/Toolbar';

class PageRedirect extends React.Component {
  state = { open: false, openType: NEW_ITEM, itemName: '', selectedItems: [] };

  componentDidMount = ({ fetchOptions, fetchItems } = this.props) => {
    const pageRefreshed =
      window.performance && performance.navigation.type == 1;
    if (pageRefreshed) {
      fetchOptions();
      fetchItems();
    }
  };

  handleOpen = openType => this.setState({ open: true, openType });
  handleClose = () => this.setState({ open: false });
  handleItemNameChange = itemName => this.setState({ itemName });

  handleAddOptionItem = () => {
    const { enqueueSnackbar, optionId } = this.props;

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
    const { enqueueSnackbar, optionId } = this.props;

    enqueueSnackbar('Adicionando item(s)...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    const { selectedItems } = this.state;

    if (selectedItems) {
      const itemsId = selectedItems.map(i => i._id);
      this.props.AddExistingItems({
        itemsId,
        optionId,
        enqueueSnackbar
      });
    }
  };

  handleSelect = selectedItems => this.setState({ selectedItems });

  render = () => {
    const { data, allItems } = this.props;
    const { open, openType, selectedItems } = this.state;
    return (
      <>
        <Dialog
          open={open}
          onClose={this.handleClose}
          onAddItem={
            openType === NEW_ITEM
              ? this.handleAddOptionItem
              : this.handleExistingItem
          }
        >
          {openType === NEW_ITEM ? (
            <NewOptionItemForm
              onItemNameChange={this.handleItemNameChange}
              priceTables={[
                { _id: 123, name: 'Acrilico' },
                { _id: 321, name: 'Base' }
              ]}
            />
          ) : (
            <ExistingOptionItemsForm
              items={allItems}
              selectedItems={selectedItems}
              onSelect={this.handleSelect}
            />
          )}
        </Dialog>

        <ItemDatatable
          data={data}
          onDialog={this.handleOpen}
          toolbars={{
            AddNew: () => (
              <AddToolbar
                title="Adicionar Item"
                onClick={() => this.handleOpen(NEW_ITEM)}
                aria-owns="add-menu"
                aria-haspopup="true"
              />
            ),
            AddExisting: () => (
              <BallotToolbar
                title="Adicionar Itens existentes"
                onClick={() => this.handleOpen(EXISTING_ITEM)}
                aria-owns="add-menu"
                aria-haspopup="true"
              />
            )
          }}
        />
      </>
    );
  };
}

PageRedirect.propTypes = {
  data: PropTypes.any.isRequired,
  allItems: PropTypes.any.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  addOptionItem: PropTypes.func.isRequired,
  AddExistingItems: PropTypes.func.isRequired,
  optionId: PropTypes.string.isRequired
};

const mapStateToProps = (store, { optionId }) => ({
  data: getOptionsItems(optionId, store),
  allItems: getItems(store)
});

const mapDispatchToProps = {
  fetchOptions,
  addOptionItem,
  fetchItems
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(PageRedirect));
