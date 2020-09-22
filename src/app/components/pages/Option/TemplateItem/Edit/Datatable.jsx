/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
//Common components
import MuiDatatable from 'app/components/common/tables/MuiDatatable';
//core
import Size from './Size';
import Quantity from './Quantity';
import DuplicateIcon from 'app/components/common/icons/DuplicateIcon';
import Loading from './LoadingSkeleton';
import { EditTemplateItemContext } from './context';

const useStyle = makeStyles({
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
});

const Datatable = ({ enqueueSnackbar, title }) => {
  const classes = useStyle();
  const {
    duplicateItem,
    templateItems,
    deleteTemplateItems,
    check,
    priceTables
  } = useContext(EditTemplateItemContext);

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
        filter: false,
        customBodyRender: function(value, tableMeta) {
          const { rowData } = tableMeta;
          const uuid = rowData[rowData.length - 1];
          const template = templateItems[uuid];
          const name = template.name || value;
          return name;
        }
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
          return <Quantity uuid={uuid} />;
        }
      }
    },
    {
      name: 'priceTable.unit',
      label: 'medida',
      options: {
        sort: false,
        filter: false,
        customBodyRender: function renderSizeComponent(unit, tableMeta) {
          const { rowData } = tableMeta;
          const uuid = rowData[rowData.length - 1];
          const templateItem = templateItems[uuid];

          const { size } = templateItem;
          const itemType =
            templateItem.itemType !== undefined
              ? templateItem.itemType
              : templateItem.item.itemType || '';
          if (!templateItem.itemType) return;
          const hasSize =
            unit !== 'quantidade' && itemType !== 'template' && size;
          return hasSize && <Size uuid={uuid} />;
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
          const { rowData } = tableMeta;
          const uuid = rowData[rowData.length - 1];
          return (
            <FormControlLabel
              value={value}
              control={<Switch color="primary" checked={value} value={value} />}
              onChange={event => {
                check(uuid);
                updateValue(value);
              }}
            />
          );
        }
      }
    },
    {
      name: 'itemPrice',
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

          return (
            <DuplicateIcon
              onClick={() => {
                if (!window.confirm('Deseja duplicar este item?')) return;
                duplicateItem(uuid);
              }}
            />
          );
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
    // selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: <Loading />
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

Datatable.propTypes = {
  onDeleteTemplateItems: PropTypes.func.isRequired,
  onDuplicateItem: PropTypes.func.isRequired,
  onCheckItem: PropTypes.func.isRequired,
  onCalculateTotal: PropTypes.func.isRequired,
  data: PropTypes.array,
  title: PropTypes.object,
  enqueueSnackbar: PropTypes.func.isRequired,
  onChangeQuantity: PropTypes.func.isRequired,
  onChangeSizeX: PropTypes.func.isRequired,
  onChangeSizeY: PropTypes.func.isRequired
};

const MemoizedDatatable = memo(Datatable);
const NotificationDatatable = withSnackbar(MemoizedDatatable);

export default NotificationDatatable;
