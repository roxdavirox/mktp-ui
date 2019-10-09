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
        // eslint-disable-next-line react/display-name
        customBodyRender: (items, tableMeta) => {
          // eslint-disable-next-line no-console
          console.log('items', items, 'Table meta', tableMeta);
          const [_id, name] = tableMeta.rowData;
          const option = { name, _id };
          return <TemplateItemSelect items={items} option={option} />;
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
    }
  };

  return (
    <MuiDatatable
      title={<h3>Selecione alguns itens</h3>}
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