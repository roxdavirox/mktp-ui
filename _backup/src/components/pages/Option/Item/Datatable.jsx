/* eslint-disable no-console */
/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import MuiDatatable from 'components/common/tables/MuiDatatable';
import { AddToolbar } from 'components/common/tables/Toolbar';
import MoreHorizIcon from 'components/common/icons/MoreHorizIcon.jsx';
import ExtensionIcon from '@material-ui/icons/Extension';
import LabelIcon from '@material-ui/icons/Label';
const styles = {
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
};

const Datatable = ({
  classes,
  onUpdate: setEditedItem,
  onOpen,
  onRowsDelete,
  data
}) => {
  const handleOpenEditItem = (itemId, tableMeta) => {
    const [name, itemType, priceTable] = tableMeta.rowData;
    const item = {
      name,
      itemType,
      priceTable: itemType === 'item' ? priceTable : undefined,
      _id: itemId
    };
    setEditedItem(item);
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
            onClick={() => onOpen('ADD_ITEM')}
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
          itemType === 'item' ? <LabelIcon /> : <ExtensionIcon />
      }
    },
    {
      name: 'priceTable',
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
        customBodyRender: (itemId, tableMeta) => {
          const [, itemType] = tableMeta.rowData;
          console.log('type', itemType);
          return itemType === 'item' ? (
            <MoreHorizIcon
              key={tableMeta.columnIndex}
              onClick={() => handleOpenEditItem(itemId, tableMeta)}
            />
          ) : (
            <Link
              to={{
                pathname: '/admin/config/option/template',
                state: {
                  fromRedirect: true,
                  itemId
                }
              }}
            >
              <MoreHorizIcon
                key={tableMeta.columnIndex}
                onClick={() => handleOpenEditItem(itemId, tableMeta)}
              />
            </Link>
          );
        },
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
