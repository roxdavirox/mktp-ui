/* eslint-disable no-console */
/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import MuiDatatable from 'components/common/tables/MuiDatatable';
import { AddToolbar } from 'components/common/tables/Toolbar';
import MoreHorizIcon from 'components/common/icons/MoreHorizIcon.jsx';
import ItemIcon from 'components/common/icons/ItemIcon.jsx';
import TemplateIcon from 'components/common/icons/TemplateIcon.jsx';
const styles = {
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
};

const Datatable = ({ classes, onUpdate, onOpen, onRowsDelete, data }) => {
  const handleRowUpdate = (itemId, tableMeta) => {
    const [name, priceTableId, _id] = tableMeta.rowData;
    const item = { name, priceTableId, _id };
    console.log('item update:', item);
    onUpdate(item);
  };

  const options = {
    filterType: 'checkbox',
    download: false,
    print: false,
    filter: false,
    viewColumns: false,
    rowHover: false,
    rowsPerPageOptions: [5, 10, 15],
    rowsPerPage: 5,
    responsive: 'stacked',
    textLabels: {
      body: {
        noMatch: 'Nenhum item'
      }
    },
    customToolbar: () => {
      return (
        <>
          <AddToolbar
            title="Adicionar Item"
            onClick={() => onOpen('add')}
            aria-owns="add-menu"
            aria-haspopup="true"
          />
        </>
      );
    },
    onRowsDelete: rowsDeleted => onRowsDelete(rowsDeleted)
  };
  const columns = [
    {
      name: 'name',
      label: 'Nome',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'itemType',
      label: 'tipo de item',
      options: {
        filter: false,
        sort: false,
        customBodyRender: itemType =>
          itemType === 'item' ? <ItemIcon /> : <TemplateIcon />
      }
    },
    {
      name: 'priceTableId',
      options: {
        filter: false,
        sort: false,
        display: 'excluded'
      }
    },
    {
      name: '_id',
      label: ' ',
      options: {
        sort: false,
        filter: false,
        customBodyRender: (value, tableMeta) => (
          <MoreHorizIcon
            key={tableMeta.columnIndex}
            onClick={() => handleRowUpdate(value, tableMeta)}
          />
        ),
        setCellProps: () => {
          return {
            className: classNames({ [classes.EditCell]: true })
          };
        }
      }
    }
  ];
  return (
    <div>
      <MuiDatatable
        title="Itens"
        data={data}
        options={options}
        columns={columns}
      />{' '}
    </div>
  );
};

Datatable.propTypes = {
  data: PropTypes.any.isRequired,
  onRowsDelete: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(Datatable));
