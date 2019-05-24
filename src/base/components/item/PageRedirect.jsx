import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import ItemDatatable from './Datatable';
import { addOptionItem, fetchItems } from './actions';
import { fetchOptions } from '../option/actions';
import { getOptionsItems, getItems } from './selectors';
import ItemDialog from './ItemDialog';
import FormRedirect from './FormRedirect';

class PageRedirect extends React.Component {
  state = { open: false, itemName: '' };

  componentDidMount = ({ fetchOptions, fetchItems } = this.props) => {
    const pageRefreshed =
      window.performance && performance.navigation.type == 1;
    if (pageRefreshed) {
      fetchOptions();
      fetchItems();
    }
  };

  handleOpen = () => this.setState({ open: true });
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

  render = ({ data, allItems } = this.props) => {
    return (
      <>
        <ItemDialog
          open={this.state.open}
          onClose={this.handleClose}
          onAddItem={this.handleAddOptionItem}
        >
          <FormRedirect
            onItemNameChange={this.handleItemNameChange}
            items={allItems}
            priceTables={[
              { _id: 123, name: 'Acrilico' },
              { _id: 321, name: 'Base' }
            ]}
          />
        </ItemDialog>
        <ItemDatatable data={data} onDialog={this.handleOpen} />
      </>
    );
  };
}

PageRedirect.propTypes = {
  data: PropTypes.any.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  addOptionItem: PropTypes.func.isRequired,
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
