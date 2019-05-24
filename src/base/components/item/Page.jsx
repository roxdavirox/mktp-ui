/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { fetchItems, addItem } from './actions';
import ItemDatatable from './Datatable';
import ItemDialog from './Dialog';
import Form from './forms/NewItemForm';
import { getItems } from './selectors';

class Page extends Component {
  state = { open: false, itemName: '' };

  componentDidMount = ({ fetchItems } = this.props) => fetchItems();

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  handleItemNameChange = itemName => this.setState({ itemName });

  handleAddItem = () => {
    const { enqueueSnackbar } = this.props;

    enqueueSnackbar('Adicionando item...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    const { itemName } = this.state;

    if (itemName) {
      this.props.addItem({ name: itemName }, enqueueSnackbar);
      this.handleClose();
    }
  };

  render = ({ data } = this.props) => {
    return (
      <>
        <ItemDialog
          open={this.state.open}
          onClose={this.handleClose}
          onAddItem={this.handleAddItem}
        >
          <Form
            onItemNameChange={this.handleItemNameChange}
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

Page.propTypes = {
  data: PropTypes.any.isRequired,
  fetchItems: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  data: getItems(store)
});

const mapDispatchToProps = {
  fetchItems,
  addItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Page));
