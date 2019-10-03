import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
//Common components
import MuiDatatable from 'components/common/tables/MuiDatatable';
import { AddToolbar } from 'components/common/tables/Toolbar.jsx';
//core
import TemplateItemSelect from './TemplateItemSelect';

const optionStyle = {
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
};

const DataTable = ({ enqueueSnackbar: snack, classes, onOpen }) => {
  const data = [
    {
      items: [
        {
          options: ['5d6eece8a8f33e0004bd5718'],
          _id: '5d6eedaea8f33e0004bd571b',
          name: 'Aço inox 0,6mm',
          priceTableId: '5d5c5bad1984340004e847cf',
          createdAt: '2019-09-03T22:48:14.457Z',
          __v: 1
        },
        {
          options: ['5d6eece8a8f33e0004bd5718'],
          _id: '5d94bd94b72c5627a05cad30',
          name: 'Acrilico 4mm',
          createdAt: '2019-10-02T15:09:08.178Z',
          __v: 1
        }
      ],
      _id: '5d6eece8a8f33e0004bd5718',
      name: 'Material',
      createdAt: '2019-09-03T22:44:56.401Z',
      __v: 5
    },
    {
      items: [
        {
          options: ['5d74ecaa43a5da0004ff1abe'],
          _id: '5d94bf5ab72c5627a05cad32',
          name: 'Furo 2mm',
          createdAt: '2019-10-02T15:16:42.755Z',
          __v: 1
        }
      ],
      _id: '5d74ecaa43a5da0004ff1abe',
      name: 'Furo',
      createdAt: '2019-09-08T11:57:30.031Z',
      __v: 1
    }
  ];
  const columns = [
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
          return <TemplateItemSelect items={items} />;
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
    customToolbar: function add() {
      return <AddToolbar title="Adicionar Opção" onClick={onOpen} />;
    }
  };

  return (
    <MuiDatatable
      title={<h2>Selecione as opções para o template</h2>}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.any.isRequired,
  onOpen: PropTypes.func.isRequired
};

export default withSnackbar(withStyles(optionStyle)(DataTable));
