/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { getEndpoint } from 'helpers/api';
import Datatable from './Datatable';

const mapItemsWithOptionname = ({ options }) =>
  options.map(o =>
    o.items.map(i => ({ optionId: o._id, optionName: o.name, ...i }))
  );

const mapOptionsItems = options =>
  options.reduce((all, item) => [...all, ...item], []);

const mapAllItemsWithCheckedProp = items =>
  items.map(item => ({ ...item, isChecked: false }));

const SelectItems = props => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const optionsEndpoint = getEndpoint('/options');

    fetch(optionsEndpoint)
      .then(res => res.json())
      .then(mapItemsWithOptionname)
      .then(mapOptionsItems)
      .then(mapAllItemsWithCheckedProp)
      // .then(async prevItems => {
      //   const { allStates } = this.props;
      //   if (!allStates.locationState) return prevItems;
      //   const { pathname } = allStates.locationState;
      //   if (pathname === '/admin/config/products/edit') {
      //     const { productId } = allStates.locationState.state;
      //     const itemsEndpoint = getEndpoint(`/products/${productId}/items`);
      //     const result = await fetch(itemsEndpoint);
      //     const data = await result.json();

      //     const { product } = data;
      //     const { productOptions } = product;
      //     const itemsIds = productOptions.map(po => po.item);
      //     const checkedItems = prevItems.map(item =>
      //       itemsIds.indexOf(item._id) !== -1
      //         ? { ...item, isChecked: !item.isChecked }
      //         : item
      //     );
      //     return checkedItems;
      //   }
      //   return prevItems;
      // })
      .then(items => this.setState({ items }));
  }, []);

  //envia o estado para o wizard
  // sendState() {
  //   return {
  //     selectedItems: this.state.items
  //       .filter(item => item.isChecked)
  //       // eslint-disable-next-line no-unused-vars
  //       .map(({ isChecked, ...rest }) => ({ ...rest }))
  //   };
  // }

  const handleCheckItem = index => {
    // this.props.enableFinishButton();
    setItems({
      items: this.state.items.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item
      )
    });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Datatable data={items} onCheckItem={handleCheckItem} />
      </Container>
    </>
  );
};

export default SelectItems;
