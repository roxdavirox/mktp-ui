/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { CreateTemplateItemContext } from './context';
//Common components
import MuiDatatable from 'app/components/common/tables/MuiDatatable';
import DuplicateIcon from 'app/components/common/icons/DuplicateIcon';
//core
import Size from './Size';
import Quantity from './Quantity';
import Loading from './LoadingSkeleton';

const useStyle = makeStyles({
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
});

const DataTable = ({ title, isLoading }) => {
  const classes = useStyle();
  const {
    duplicateItem,
    templateItems,
    priceTables,
    check,
    deleteTemplateItems
  } = useContext(CreateTemplateItemContext);

  const handleDuplicate = index => {
    if (!window.confirm('Deseja duplicar este item?')) return;

    duplicateItem(index);
  };

  const columns = [
    {
      name: '_id',
      label: ' ',
      options: {
        sort: false,
        filter: false,
        display: false
      }
    },
    {
      name: 'option.name',
      label: 'Nome da opção',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => {
          return {
            className: classNames({ [classes.NameCell]: true })
          };
        }
      }
    },
    {
      name: 'name',
      label: 'Nome do item ',
      options: {
        sort: false,
        filter: false
      }
    },
    {
      name: 'quantity',
      label: 'Quantidade',
      options: {
        sort: false,
        filter: false,
        customBodyRender: function renderUnitComponent(value, tableMeta) {
          const { rowData } = tableMeta;
          const uuid = rowData[rowData.length - 1];
          return (
            templateItems[uuid] && (
              <Quantity key={uuid} uuid={uuid} initialValue={value} />
            )
          );
        }
      }
    },
    {
      name: 'priceTable.unit',
      label: 'medida',
      options: {
        sort: false,
        filter: false,
        customBodyRender: function renderUnitComponent(unit, tableMeta) {
          const { rowData } = tableMeta;
          const uuid = rowData[rowData.length - 1];
          const templateItem = templateItems[uuid];
          if (!templateItem) return;
          const { size } = templateItem;
          if (!size) return;
          const hasUnit = unit !== 'quantidade' && unit && size;
          return (
            hasUnit &&
            templateItems[uuid] && <Size key={uuid} uuid={uuid} size={size} />
          );
        }
      }
    },
    {
      name: 'isChecked',
      label: 'Selecionar',
      options: {
        sort: true,
        filter: true,
        customBodyRender: function renderSwitchSelect(
          value,
          tableMeta,
          updateValue
        ) {
          const handleCheckItem = e => {
            const isChecked = value === 'Yes' ? false : true;
            updateValue(isChecked);
            const { rowData } = tableMeta;
            const uuid = rowData[rowData.length - 1];
            check(uuid);
          };
          return (
            <FormControlLabel
              value={value ? 'Yes' : 'No'}
              control={
                <Switch
                  color="primary"
                  checked={value}
                  value={value ? 'Yes' : 'No'}
                />
              }
              onChange={handleCheckItem}
            />
          );
        }
      }
    },
    {
      name: 'price',
      label: 'Preço',
      options: {
        sort: false,
        filter: false,
        customBodyRender: function renderPriceValue(price, tableMeta) {
          const { rowData } = tableMeta;
          const uuid = rowData[rowData.length - 1];
          const {
            priceTable,
            quantity,
            size,
            isChecked,
            itemType
          } = templateItems[uuid];
          if (priceTable && itemType === 'item' && isChecked) {
            const _priceTable = priceTables[priceTable._id];
            const { unitPrice, unit } = _priceTable;
            const fixedPrice =
              unit !== 'quantidade'
                ? unitPrice * quantity * size.x * size.y
                : unitPrice * quantity;
            return fixedPrice.toFixed(4);
          } else if (
            itemType === 'template' &&
            templateItems[uuid].priceTables &&
            isChecked
          ) {
            const templateItem = templateItems[uuid];
            const _totalPrice = Object.keys(templateItem.priceTables)
              .map(id => priceTables[id])
              .reduce((_total, pt) => _total + pt.unitPrice, 0);
            const fixedPrice = _totalPrice * quantity;
            return fixedPrice.toFixed(4);
          } else {
            const fixedPrice = price ? price : 0;
            return fixedPrice.toFixed(4);
          }
        }
      }
    },
    {
      name: 'uuid',
      label: 'Duplicar',
      options: {
        sort: false,
        filter: false,
        customBodyRender: function renderDuplicateItem(value, tableMeta) {
          const { rowData } = tableMeta;
          const uuid = rowData[rowData.length - 1];
          return <DuplicateIcon index={uuid} onClick={handleDuplicate} />;
        }
      }
    }
  ];

  const options = {
    filterType: 'checkbox',
    download: false,
    print: false,
    filter: true,
    viewColumns: true,
    rowHover: false,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    textLabels: {
      body: {
        noMatch: <Loading isLoading={isLoading} />
      }
    },
    onRowsDelete: function rowsDelete(rows) {
      const indexRows = rows.data.map(r => r.index);
      if (indexRows) {
        deleteTemplateItems(indexRows);
      }
    }
    // customToolbarSelect: () => {}
  };

  const data = Object.values(templateItems);
  return (
    <MuiDatatable
      title={title}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.object
};

export default withSnackbar(DataTable);
