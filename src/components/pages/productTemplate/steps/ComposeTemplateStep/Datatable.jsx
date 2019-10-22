/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { withSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
//Common components
import MuiDatatable from 'components/common/tables/MuiDatatable';
//core
import InfoItem from './InfoItem';
import Medida from './Medida';
import { setCheckedItem } from 'store/ducks/productTemplate';

const useStyle = makeStyles({
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 },
  QuantityTextField: {
    maxWidth: 40,
    textAlign: 'center'
  }
});

const DataTable = ({ dataItems, dataOptions }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
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
        // TODO: exibir medida de acordo com a tabela de preço - cada item pode ter uma unidade diferente
        // eslint-disable-next-line react/display-name
        // customBodyRender: (items, tableMeta) => {
        //   // eslint-disable-next-line no-console
        //   console.log('items', items, 'Table meta', tableMeta);
        //   const [_id, name] = tableMeta.rowData;
        //   const option = { name, _id };
        //   return <TemplateItemSelect items={items} option={option} />;
        // }
      }
    },
    {
      name: 'quantity',
      label: 'Quantidade',
      options: {
        sort: false,
        filter: false,
        // TODO: renderizar componentes para medidas aqui
        customBodyRender: function renderUnitComponent(unit, tableMeta) {
          return <TextField className={classes.QuantityTextField} value={1} />;
        }
      }
    },
    {
      name: 'priceTableId.unit',
      label: 'medida',
      options: {
        sort: false,
        filter: false,
        // TODO: renderizar componentes para medidas aqui
        customBodyRender: function renderUnitComponent(unit, tableMeta) {
          console.log('meta', tableMeta);
          // const { rowData } = tableMeta;
          // const [optionId] = rowData;
          const hasUnit = unit !== 'quantidade' && unit;

          return hasUnit && <Medida optionId={''} />;
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
          console.log('value', value);
          return (
            <FormControlLabel
              label={value ? 'Yes' : 'No'}
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
                dispatch(setCheckedItem(tableMeta.rowIndex, isChecked));
                updateValue(isChecked);
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
    selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: 'empty'
      }
    },
    customToolbarSelect: () => {},
    onRowsSelect: function selecionaLinhas(selectedRow, allSelectedRows) {
      console.log('linhas selecionadas:', selectedRow);
    }
  };

  return (
    <MuiDatatable
      title={<InfoItem options={dataOptions} />}
      data={dataItems}
      columns={columns}
      options={options}
    />
  );
};

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  dataItems: PropTypes.array,
  dataOptions: PropTypes.array
};

export default withSnackbar(DataTable);
