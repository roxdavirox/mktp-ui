/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
//Common components
import MuiDatatable from 'components/common/tables/MuiDatatable';
//core
import TemplateItemSelect from './TemplateItemSelect';
import InfoItem from './InfoItem';

const optionStyle = {
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
};

const DataTable = ({ data, classes }) => {
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
      name: 'name',
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
      name: 'items',
      label: 'Itens ',
      options: {
        sort: false,
        filter: false,
        // TODO: exibir medida de acordo com a tabela de preço - cada item pode ter uma unidade diferente
        // eslint-disable-next-line react/display-name
        customBodyRender: (items, tableMeta) => {
          // eslint-disable-next-line no-console
          console.log('items', items, 'Table meta', tableMeta);
          const [_id, name] = tableMeta.rowData;
          const option = { name, _id };
          return <TemplateItemSelect items={items} option={option} />;
        }
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
          return <h5>Quantidade: {unit}</h5>;
        }
      }
    },
    {
      name: 'unit',
      label: 'medida',
      options: {
        sort: false,
        filter: false,
        // TODO: renderizar componentes para medidas aqui
        customBodyRender: function renderUnitComponent(unit, tableMeta) {
          console.log('tableMeta>', tableMeta);
          return <h4>Unidade: {unit}</h4>;
        }
      }
    },
    {
      name: 'add',
      label: 'duplicar',
      options: {
        sort: false,
        filter: false,
        // TODO: botao para duplicar linha
        customBodyRender: function renderUnitComponent(_, tableMeta) {
          return <a href="#">+</a>;
        }
      }
    }
  ];
  const options = {
    filterType: 'checkbox',
    download: false,
    print: false,
    filter: false,
    viewColumns: false,
    rowHover: false,
    textLabels: {
      body: {
        noMatch: 'empty'
      }
    },
    customToolbarSelect: () => {}
  };

  return (
    <MuiDatatable
      title={<InfoItem options={data} />}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array
};

export default withSnackbar(withStyles(optionStyle)(DataTable));
