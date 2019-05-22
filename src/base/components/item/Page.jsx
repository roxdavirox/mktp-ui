/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchItems, addItem } from './actions';
import ItemDatatable from './Datatable';
import FormDialog from './FormDialog';
import { getItems } from './selectors';

class Page extends Component {
  state = { open: false };
  componentDidMount = ({ fetchItems } = this.props) => fetchItems();

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });
  handleAddItem = itemName => {
    console.log('add item', itemName);
    if (itemName) {
      this.props.addItem({ name: itemName });
    }
  };

  render = ({ data } = this.props) => {
    return (
      <>
        <FormDialog
          open={this.state.open}
          onClose={this.handleClose}
          onAddItem={this.handleAddItem}
          priceTables={[
            { _id: 123, name: 'Acrilico' },
            { _id: 321, name: 'Base' }
          ]}
        />
        <ItemDatatable data={data} onDialog={this.handleOpen} />
      </>
    );
  };
}

Page.propTypes = {
  data: PropTypes.any.isRequired,
  fetchItems: PropTypes.func.isRequired,
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
)(Page);
