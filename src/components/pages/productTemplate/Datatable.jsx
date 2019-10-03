import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
//Common components
import MuiDatatable from 'components/common/tables/MuiDatatable';
import { AddToolbar } from 'components/common/tables/Toolbar.jsx';
//core
import TemplateItemSelect from './TemplateItemSelect';
import { deleteOptions } from 'store/ducks/option';

const optionStyle = {
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
};

const DataTable = ({ enqueueSnackbar: snack, classes, onOpen, data }) => {
  const dispatch = useDispatch();

  const handleRowsDelete = rows => {
    const { data: dataRows } = rows;

    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const deletedOptionsIds = indexRows.map(index => data[index]._id);

    snack('Deletando...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    dispatch(deleteOptions(deletedOptionsIds, snack));
  };

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
    },
    onRowsDelete: rowsDeleted => handleRowsDelete(rowsDeleted)
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
  data: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.any.isRequired,
  onOpen: PropTypes.func.isRequired
};

export default withSnackbar(withStyles(optionStyle)(DataTable));
