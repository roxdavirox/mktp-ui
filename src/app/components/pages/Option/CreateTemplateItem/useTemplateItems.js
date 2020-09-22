/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import reactUuid from 'react-uuid';
import { getEndpoint, createPostRequest } from 'helpers/api';
import { convertToObjectWithKeys } from 'helpers/array';
import { normalizeWithDefaultProps } from 'helpers/items';

import _ from 'lodash';

const useTemplateItems = props => {
  const [total, setTotal] = useState(0);
  const [templateItems, setTemplateItems] = useState([]);
  const [templateQuantity, setTemplateQuantity] = useState(1);
  const [priceTables, setPriceTables] = useState({});

  useEffect(() => {
    if (_.isEmpty(templateItems)) return;
    calculateUnitPrice();
  }, [templateItems, templateQuantity]);

  useEffect(() => {
    if (_.isEmpty(priceTables)) return;
    calculateTotalPrice();
  }, [priceTables]);

  const fetchTemplateItems = async () => {
    const endpoint = getEndpoint('/items/templates');

    try {
      const res = await fetch(endpoint);
      const { items } = await res.json();

      const objectItems = normalizeWithDefaultProps(items);

      const _defaultItemPriceTables = Object.values(objectItems)
        .filter(item => item.itemType === 'item' && item.priceTable)
        .reduce((obj, item) => {
          const { priceTable } = item;
          const { _id: priceTableId, unit } = priceTable;
          return {
            ...obj,
            [priceTableId]: {
              id: priceTableId,
              unit,
              area: 0,
              unitPrice: 0
            }
          };
        }, {});

      const _defaultTemplatePriceTables = Object.values(objectItems)
        .filter(item => item.itemType === 'template' && item.priceTables)
        .map(templateItem => {
          const _tables = Object.values(templateItem.priceTables).map(pt => pt);
          return _tables;
        })
        .reduce((priceTables, pt) => [...priceTables, ...pt], [])
        .reduce((_tables, _priceTable) => {
          const prevPriceTable = _defaultItemPriceTables[_priceTable.id];
          if (!prevPriceTable) return {};
          return {
            ..._tables,
            [_priceTable.id]: {
              ...prevPriceTable,
              area: prevPriceTable.area + _priceTable.area
            }
          };
        }, _defaultItemPriceTables);

      setPriceTables(_defaultTemplatePriceTables);
      setTemplateItems(objectItems);
    } catch (e) {
      console.log(`Error on get template items ${e}`);
    }
  };

  const change = id => newProp =>
    setTemplateItems(prevItems => ({
      ...prevItems,
      [id]: { ...prevItems[id], ...newProp }
    }));

  const changeItemPrice = (id, price) => change(id)({ price });

  const changeItemQuantity = (id, quantity) => {
    if (quantity < 1) return;
    change(id)({ quantity });
  };

  const changeSizeX = (id, valueX) => {
    const templateItem = templateItems[id];
    const {
      size: { y }
    } = templateItem;
    const newSize = {
      y,
      x: valueX
    };
    change(id)({ size: newSize });
  };

  const changeSizeY = (id, valueY) => {
    const templateItem = templateItems[id];
    const {
      size: { x }
    } = templateItem;
    const newSize = {
      x,
      y: valueY
    };
    change(id)({ size: newSize });
  };

  const duplicateItem = uuid => {
    const _templates = Object.values(templateItems).reduce((obj, item) => {
      if (item.uuid === uuid) {
        const newUuid = reactUuid();

        return {
          ...obj,
          [item.uuid]: item,
          [newUuid]: { ...item, uuid: newUuid }
        };
      }
      return {
        ...obj,
        [item.uuid]: item
      };
    }, {});

    setTemplateItems(_templates);
  };

  const check = id => {
    const { isChecked } = templateItems[id];

    change(id)({ isChecked: !isChecked });

    if (!isChecked) return;
    changeItemPrice(id, 0);
  };

  const calculateUnitPrice = async () => {
    const checkedItems = Object.values(templateItems).filter(
      item => item.isChecked
    );

    const _priceTables = Object.values(priceTables).reduce(
      (allPriceTable, pt) => ({
        ...allPriceTable,
        [pt.id]: { ...pt, area: 0, unitPrice: 0 }
      }),
      {}
    );

    if (_.isEmpty(checkedItems)) {
      setPriceTables(_priceTables);
      return;
    }

    const itemsPriceTables = checkedItems
      .filter(item => item.itemType === 'item' && item.priceTable)
      .reduce((allPriceTables, item) => {
        const { priceTable } = item;
        const { unit } = priceTable;
        return {
          ...allPriceTables,
          [priceTable._id]: {
            id: priceTable._id,
            unit,
            area:
              unit !== 'quantidade'
                ? item.quantity * item.size.x * item.size.y
                : item.quantity
          }
        };
      }, {});

    const templateItemsPriceTables = checkedItems
      .filter(item => item.itemType === 'template' && item.priceTables)
      .reduce((_itemsPriceTables, template) => {
        if (_.isEmpty(template.priceTables)) return { ..._itemsPriceTables };

        return {
          ..._itemsPriceTables,
          ...Object.values(template.priceTables).reduce(
            (allPriceTables, pt) => {
              return {
                ...allPriceTables,
                [pt.id]: {
                  area: pt.area * template.quantity
                }
              };
            },
            {}
          )
        };
      }, {});

    const mergedPriceTables = Object.keys(_priceTables)
      .map(id => {
        if (
          _.isEmpty(itemsPriceTables[id]) &&
          _.isEmpty(templateItemsPriceTables[id])
        ) {
          return priceTables[id];
        }

        if (
          !_.isEmpty(itemsPriceTables[id]) &&
          !_.isEmpty(templateItemsPriceTables[id])
        ) {
          const _itemPricetable = itemsPriceTables[id];
          const _templatePricetable = templateItemsPriceTables[id];
          return {
            ..._priceTables[id],
            area: _itemPricetable.area + _templatePricetable.area
          };
        }

        if (!_.isEmpty(itemsPriceTables[id])) {
          return {
            ..._priceTables[id],
            ...itemsPriceTables[id]
          };
        }

        if (!_.isEmpty(templateItemsPriceTables[id])) {
          return {
            ..._priceTables[id],
            ...templateItemsPriceTables[id]
          };
        }
      })
      .reduce(
        (allMergedPriceTables, pt) => ({
          ...allMergedPriceTables,
          [pt.id]: pt
        }),
        {}
      );

    const priceTablesRequest = Object.values(mergedPriceTables).reduce(
      (allPriceTables, pt) => ({
        ...allPriceTables,
        [pt.id]: {
          ...pt,
          area: pt.area * templateQuantity
        }
      }),
      {}
    );

    const body = {
      priceTables: Object.values(priceTablesRequest)
    };

    const request = createPostRequest(body);
    const endpoint = getEndpoint(`/price-tables/prices`);

    try {
      const res = await fetch(endpoint, request);
      const { priceTables } = await res.json();
      setPriceTables(priceTables);
    } catch (e) {
      console.error(`Error on get total value ${e}`);
    }
  };

  const calculateTotalPrice = () => {
    const checkedTemplateItems = Object.values(templateItems).filter(
      item => item.isChecked
    );

    const checkedItems = checkedTemplateItems.filter(
      item => item.itemType === 'item' && item.priceTable
    );

    const totalItemPrice = checkedItems
      .filter(i => i.itemType === 'item')
      .reduce((_total, item) => {
        const { unitPrice = 1, unit } = priceTables[item.priceTable._id];
        const totalPrice =
          unit !== 'quantidade'
            ? item.size.x * item.size.y * item.quantity * unitPrice
            : item.quantity * unitPrice;
        return _total + totalPrice;
      }, 0);

    const totalTemplateItemPrice = checkedTemplateItems
      .filter(i => i.itemType === 'template' && i.priceTables)
      .reduce((_totalTemplate, templateItem) => {
        const totalPriceTables = Object.values(templateItem.priceTables).reduce(
          (_totalPriceTable, pt) => {
            const { unitPrice = 1, unit } = priceTables[pt.id];
            const totalPrice =
              unit !== 'quantidade'
                ? templateItem.size.x *
                  templateItem.size.y *
                  templateItem.quantity *
                  unitPrice
                : templateItem.quantity * unitPrice;
            const areaPriceTable = pt.area > 0 ? pt.area : 1;
            return _totalPriceTable + totalPrice * areaPriceTable;
          },
          0
        );
        return _totalTemplate + totalPriceTables;
      }, 0);

    const _total = (totalItemPrice + totalTemplateItemPrice) * templateQuantity;
    setTotal(_total);
  };

  const deleteTemplateItems = indexRows => {
    const filteredItems = Object.values(templateItems).filter(
      (_, index) => indexRows.indexOf(index) === -1
    );
    const _templateItems = convertToObjectWithKeys(filteredItems)('uuid')({});
    setTemplateItems(_templateItems);
  };

  return {
    total,
    templateItems,
    templateQuantity,
    priceTables,

    setTemplateQuantity,
    deleteTemplateItems,
    check,
    duplicateItem,
    changeSizeX,
    changeSizeY,
    changeItemPrice,
    changeItemQuantity,
    calculateUnitPrice,
    calculateTotalPrice,
    fetchTemplateItems
  };
};

export default useTemplateItems;
