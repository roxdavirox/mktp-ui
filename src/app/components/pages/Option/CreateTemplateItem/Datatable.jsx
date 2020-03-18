/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
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

const DataTable = ({
  templateItems,
  title,
  onDeleteTemplateItems,
  onDuplicateItem,
  onCheckItem,
  onChangeValueX,
  onChangeValueY,
  onChangeQuantity,
  isLoading,
  priceTables
}) => {
  const classes = useStyle();

  const handleDuplicate = index => {
    if (window.confirm('Deseja duplicar este item?')) {
      onDuplicateItem(index);
    }
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
              <Quantity
                key={uuid}
                uuid={uuid}
                initialValue={value}
                onChangeQuantity={onChangeQuantity}
              />
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
            templateItems[uuid] && (
              <Size
                key={uuid}
                uuid={uuid}
                size={size}
                onChangeValueX={onChangeValueX}
                onChangeValueY={onChangeValueY}
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
              // label={value ? 'Yes' : 'No'}
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
                const { rowData } = tableMeta;
                const uuid = rowData[rowData.length - 1];
                onCheckItem(uuid);
                updateValue(isChecked);
              }}
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
          const { priceTable, quantity, size } = templateItems[uuid];
          if (priceTable && size) {
            const _priceTable = priceTables[priceTable._id];
            const { unitPrice } = _priceTable;
            const fixedPrice = unitPrice * quantity * size.x * size.y || 0;
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
    // selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: <Loading isLoading={isLoading} />
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
  templateItems: PropTypes.array,
  onDeleteTemplateItems: PropTypes.func.isRequired,
  title: PropTypes.object,
  onDuplicateItem: PropTypes.func.isRequired,
  onCheckItem: PropTypes.func.isRequired,
  onCalculateTotal: PropTypes.func.isRequired,
  onChangeValueX: PropTypes.func.isRequired,
  onChangeValueY: PropTypes.func.isRequired,
  onChangeQuantity: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  priceTables: PropTypes.array
};

export default withSnackbar(DataTable);
