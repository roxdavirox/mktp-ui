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
  isLoading
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
          const [id] = tableMeta.rowData;
          return (
            <Quantity
              itemId={id}
              initialValue={value}
              onChangeQuantity={onChangeQuantity}
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
        customBodyRender: function renderUnitComponent(unit, tableMeta) {
          const templateItem = templateItems[tableMeta.rowIndex];
          const { size } = templateItem;
          const hasUnit = unit !== 'quantidade' && unit && size;
          return (
            hasUnit && (
              <Size
                rowIndex={tableMeta.rowIndex}
                templateItem={templateItem}
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
                const [id] = tableMeta.rowData;
                onCheckItem(id);
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
          return price ? price : 0;
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
              index={tableMeta.rowIndex}
              onClick={handleDuplicate}
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

  return (
    <MuiDatatable
      title={title}
      data={templateItems}
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
  isLoading: PropTypes.bool
};

export default withSnackbar(memo(DataTable));
