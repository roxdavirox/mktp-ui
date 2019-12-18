/* eslint-disable no-unused-vars */
import React from 'react';
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

const DataTable = ({
  templateItems,
  title,
  onDeleteTemplateItems,
  onDuplicateItem,
  onCheckItem,
  onCalculateTotal
}) => {
  const classes = useStyle();
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
          const templateItem = templateItems[tableMeta.rowIndex];
          return (
            <Quantity
              rowIndex={tableMeta.rowIndex}
              templateItem={templateItem}
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
          const hasUnit = unit !== 'quantidade' && unit;
          const templateItem = templateItems[tableMeta.rowIndex];

          return (
            hasUnit && (
              <Size
                rowIndex={tableMeta.rowIndex}
                templateItem={templateItem}
                onCalculateTotal={onCalculateTotal}

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
                onCheckItem(tableMeta.rowIndex, isChecked);
                const templateItem = templateItems[tableMeta.rowIndex];
                // eslint-disable-next-line no-console
                console.log('template item', templateItem);

                onCalculateTotal(tableMeta.rowIndex, templateItem, isChecked);

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
  onCalculateTotal: PropTypes.func.isRequired
};

export default withSnackbar(DataTable);
