import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import classNames from 'classnames';
import MuiDatatable from 'app/components/common/tables/MuiDatatable';
import TableHeadCell from './TableHeadCell';

const useStyles = makeStyles({
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500, padding: '0 0 0 2em' }
});

const Datatable = ({ data, onCheckItem, onSortData }) => {
  const classes = useStyles();
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
        noMatch: 'empty'
      }
    },
    selectableRows: 'none',
    onColumnSortChange: function(changedColumn, d) {
      console.log('changedColumn ', changedColumn);
      console.log('d', d);
      onSortData(changedColumn);
    },
    customToolbarSelect: () => {} // apaga botão de delete
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
      name: 'optionName',
      label: 'Opção',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => {
          return {
            className: classNames({ [classes.NameCell]: true })
          };
        },
        setCellHeaderProps: () => {
          return {
            className: classNames({
              [classes.NameCell]: true
            })
          };
        },
        // eslint-disable-next-line react/display-name
        customHeadRender: (columnMeta, handleToggleColumn) => {
          // eslint-disable-next-line no-console
          console.log('columnMeta', columnMeta);

          return (
            <TableHeadCell onClick={() => handleToggleColumn(1)}>
              {columnMeta.label}
            </TableHeadCell>
          );
        }
      }
    },
    {
      name: 'name',
      label: 'Item',
      options: {
        filter: true,
        sort: true
        // setCellProps: () => {
        //   return {
        //     className: classNames({ [classes.NameCell]: true })
        //   };
        // }
      }
    },
    {
      name: 'isChecked',
      label: ' ',
      options: {
        sort: true,
        filter: true,
        setCellProps: () => {
          return {
            className: classNames({ [classes.EditCell]: true })
          };
        },
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
                const [itemId] = tableMeta.rowData;
                onCheckItem(itemId);
                updateValue(isChecked);
              }}
            />
          );
        }
      }
    }
  ];
  return <MuiDatatable data={data} options={options} columns={columns} />;
};

Datatable.propTypes = {
  data: PropTypes.array,
  onCheckItem: PropTypes.func,
  onSortData: PropTypes.func
};

export default Datatable;
