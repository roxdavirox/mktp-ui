/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// theme components
import { getEndpoint } from 'helpers/api';
import Datatable from './Datatable';

const style = {
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center'
  }
};

const mapItemsWithOptionname = ({ options }) =>
  options.map(o =>
    o.items.map(i => ({ optionId: o._id, optionName: o.name, ...i }))
  );

const mapOptionsItems = options =>
  options.reduce((all, item) => [...all, ...item], []);

const mapAllItemsWithCheckedProp = items =>
  items.map(item => ({ ...item, isChecked: false }));

class OptionStep extends React.Component {
  state = {
    items: []
  };

  componentDidMount = () => {
    const optionsEndpoint = getEndpoint('/options');

    fetch(optionsEndpoint)
      .then(res => res.json())
      .then(mapItemsWithOptionname)
      .then(mapOptionsItems)
      .then(mapAllItemsWithCheckedProp)
      .then(async prevItems => {
        const { allStates } = this.props;
        if (!allStates.locationState) return prevItems;
        const { pathname } = allStates.locationState;
        console.log('prevItems', prevItems);
        if (pathname === '/admin/config/products/edit') {
          const { productId } = allStates.locationState.state;
          const itemsEndpoint = getEndpoint(`/products/${productId}/items`);
          const result = await fetch(itemsEndpoint);
          const data = await result.json();

          const { product } = data;
          const { options: productOptions } = product;
          const itemsIds = productOptions
            ? productOptions.reduce((arr, op) => [...arr, ...op.items], [])
            : [];
          const checkedItems = prevItems.map(item =>
            itemsIds.indexOf(item._id) !== -1
              ? { ...item, isChecked: !item.isChecked }
              : item
          );
          return checkedItems;
        }
        return prevItems;
      })
      .then(items => this.setState({ items }));
  };

  //envia o estado para o wizard
  sendState() {
    return {
      selectedItems: this.state.items
        .filter(item => item.isChecked)
        // eslint-disable-next-line no-unused-vars
        .map(({ isChecked, ...rest }) => ({ ...rest }))
    };
  }

  isValidated() {
    return true;
  }

  handleCheckItem = index =>
    this.setState({
      items: this.state.items.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item
      )
    });

  render() {
    return (
      <>
        <Datatable data={this.state.items} onCheckItem={this.handleCheckItem} />
      </>
    );
  }
}

OptionStep.propTypes = {
  allStates: PropTypes.object
};

export default withStyles(style)(OptionStep);
