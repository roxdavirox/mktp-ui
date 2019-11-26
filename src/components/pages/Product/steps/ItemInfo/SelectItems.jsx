/* eslint-disable no-console */
import React from 'react';
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
    const endpoint = getEndpoint('/options');

    fetch(endpoint)
      .then(res => res.json())
      .then(mapItemsWithOptionname)
      .then(mapOptionsItems)
      .then(mapAllItemsWithCheckedProp)
      .then(items => this.setState({ items }));

    // if (!this.props.allStates.locationState) return;
    // TODO: SELECIONAR OS ITENS QUE JA EXISTEM NO PRODUTO
    // const { allStates } = this.props;
    // if (allStates.locationState.pathname === '/admin/config/products/edit') {

    // }
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

export default withStyles(style)(OptionStep);
