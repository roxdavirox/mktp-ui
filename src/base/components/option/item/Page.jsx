/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import {
  addOptionItem,
  addExistingItems,
  deleteOptionItems,
  fetchItems,
  editItem
} from 'base/components/item/actions';
import { fetchOptions } from '../actions';
import { getOptionsItems, getItems } from 'base/components/item/selectors';
import { getPriceTables } from 'base/components/priceTable/selectors';
import Dialog from './Dialog';
import Datatable from './Datatable';

const getOptionId = props => {
  const { state } = props.location;
  const { optionId } = state;
  return optionId;
};

class Page extends React.Component {
  state = { open: false, mode: 'add', item: {}, selectedItems: [] };

  componentDidMount = ({ fetchOptions, fetchItems } = this.props) => {
    const pageRefreshed =
      window.performance && performance.navigation.type == 1;
    if (pageRefreshed) {
      fetchOptions();
      fetchItems();
    }
  };

  handleOpen = mode => this.setState({ open: true, mode });
  handleClose = () => this.setState({ open: false, item: null });

  handleAddOptionItem = item => {
    const { enqueueSnackbar } = this.props;
    const optionId = getOptionId(this.props);

    enqueueSnackbar('Adicionando item...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    if (item) {
      this.props.addOptionItem(item, optionId, enqueueSnackbar);
      this.handleClose();
    }
  };

  handleEditItem = item => {
    const { enqueueSnackbar: snack, editItem } = this.props;

    snack('Adicionando item...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    editItem(item, snack);
    this.handleClose();
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

  handleUpdate = item => this.setState({ open: true, mode: 'edit', item });

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
    const { open } = this.state;

    const fns = {
      fnAdd: this.handleAddOptionItem,
      fnEdit: this.handleEditItem,
      fnUpdate: this.handleUpdate,
      fnExistingItems: this.handleExistingItem,
      fnSelect: this.handleSelect,
      fnOpen: this.handleOpen,
      fnClose: this.handleClose,
      fnRowsDelete: this.handleRowsDelete
    };

    return (
      <>
        {open && <Dialog {...fns} {...this.props} {...this.state} />}
        <Datatable {...fns} {...this.props} />
      </>
    );
  };
}

Page.propTypes = {
  data: PropTypes.any.isRequired,
  allItems: PropTypes.any.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  addOptionItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  addExistingItems: PropTypes.func.isRequired,
  optionId: PropTypes.string.isRequired,
  deleteOptionItems: PropTypes.func.isRequired,
  priceTables: PropTypes.array.isRequired
};

const mapStateToProps = (store, ownProps) => {
  const optionId = getOptionId(ownProps);
  console.log('optionId: ', optionId);

  const data = getOptionsItems(optionId, store);
  const dataIds = data.map(d => d._id);
  const allItems = getItems(store);
  return {
    data,
    allItems: allItems.filter(item => dataIds.indexOf(item._id) === -1),
    priceTables: getPriceTables(store)
  };
};

const mapDispatchToProps = {
  fetchOptions,
  addOptionItem,
  addExistingItems,
  fetchItems,
  deleteOptionItems,
  editItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Page));
