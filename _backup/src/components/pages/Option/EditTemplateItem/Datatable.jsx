/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
//Common components
import MuiDatatable from 'components/common/tables/MuiDatatable';
//core
import Size from './Size';
import Quantity from './Quantity';
import DuplicateIcon from 'components/common/icons/DuplicateIcon';
import Loading from './LoadingSkeleton';

const useStyle = makeStyles({
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
});

const Datatable = ({
  data,
  onDeleteTemplateItems,
  onDuplicateItem,
  onCheckItem,
  onCalculateTotal,
  enqueueSnackbar,
  onChangeQuantity,
  title,
  onChangeSizeX,
  onChangeSizeY
}) => {
  const classes = useStyle();
  const columns = [
    {
      name: 'itemId',
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
          const templateItem = data[tableMeta.rowIndex];
          const name = templateItem.name || value;
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
          const templateItem = data[tableMeta.rowIndex];
          const { quantity } = data[tableMeta.rowIndex];
          return (
            <Quantity
              rowIndex={tableMeta.rowIndex}
              templateItem={templateItem}
              onCalculateTotal={onCalculateTotal}
              onChangeQuantity={onChangeQuantity}
              quantity={quantity}
            />
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
        customBodyRender: function renderSizeComponent(unit, tableMeta) {
          const templateItem = data[tableMeta.rowIndex];

          const { size } = templateItem;
          const itemType =
            templateItem.itemType !== undefined
              ? templateItem.itemType
              : templateItem.item.itemType || '';
          if (!templateItem.itemType) return;
          const hasSize =
            unit !== 'quantidade' && itemType !== 'template' && size;
          return (
            hasSize && (
              <Size
                rowIndex={tableMeta.rowIndex}
                templateItem={templateItem}
                valueX={size.x}
                valueY={size.y}
                onChangeSizeX={onChangeSizeX}
                onChangeSizeY={onChangeSizeY}
              />
            )
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
              onChange={event => {
                const isChecked = event.target.value === 'Yes' ? false : true;
                onCheckItem(tableMeta.rowIndex, isChecked);
                const templateItem = data[tableMeta.rowIndex];

                onCalculateTotal(tableMeta.rowIndex, templateItem, isChecked);

                updateValue(isChecked);
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
          const templateItem = data[tableMeta.rowIndex];
          const { quantity, isChecked, itemType } = templateItem;

          if (!isChecked) return 0;

          return price && itemType === 'template'
            ? price * quantity
            : price || 0;
        }
      }
    },
    {
      name: 'duplicate',
      label: 'Duplicar',
      options: {
        sort: false,
        filter: false,
        customBodyRender: function renderDuplicateItem(value, tableMeta) {
          return (
            <DuplicateIcon
              onClick={() => {
                if (window.confirm('Deseja duplicar este item?')) {
                  onDuplicateItem(tableMeta.rowIndex);
                }
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
        onDeleteTemplateItems(indexRows);
      }
    }
    // customToolbarSelect: () => {}
  };
  console.log('datatable render');
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
