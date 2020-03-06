import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MuiDatatable from 'components/common/tables/MuiDatatable';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import classNames from 'classnames';

const useStyles = makeStyles({
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
});

const Datatable = ({ data, onCheckItem }) => {
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
        sort: true
        // setCellProps: () => {
        //   return {
        //     className: classNames({ [classes.NameCell]: true })
        //   };
        // }
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
      label: 'Selecionar',
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
                onCheckItem(tableMeta.rowIndex);
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
  onCheckItem: PropTypes.func
};

export default Datatable;
