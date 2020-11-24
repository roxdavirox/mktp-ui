/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/display-name */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getOptionById } from 'app/redux/selectors/Option.selectors';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import DialogMenu from './DialogMenu';
import MuiDatatable from 'app/components/common/tables/MuiDatatable';
import { AddToolbar } from 'app/components/common/tables/Toolbar';
import MoreHorizIcon from 'app/components/common/icons/MoreHorizIcon.jsx';
import EditableLabel from 'app/components/common/labels/EditableLabel';
import { updateOption } from 'app/redux/actions/Option.actions';

const styles = {
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
};

const Datatable = ({
  enqueueSnackbar: snack,
  classes,
  onUpdate: setEditedItem,
  onOpen,
  onRowsDelete,
  data,
  optionId
}) => {
  const dispatch = useDispatch();
  const [anchorElement, setAnchor] = useState(null);

  const handleOpenEditItem = (itemId, tableMeta) => {
    const [name, itemType, priceTable, showUnitField] = tableMeta.rowData;
    const item = {
      name,
      itemType,
      priceTable: itemType === 'item' ? priceTable : undefined,
      _id: itemId,
      showUnitField
    };
    setEditedItem(item);
  };

  const handleCreateItem = () => {
    onOpen('ADD_ITEM');
    handleCloseMenu();
  };
  const handleMenuClick = e => setAnchor(e.currentTarget);
  const handleCloseMenu = () => setAnchor(null);

  const option = useSelector(store => getOptionById(optionId, store));

  const handleUpdateName = name => {
    if (name == option.name) return;
    dispatch(updateOption(optionId, name, snack));
  };

  const options = {
    filterType: 'checkbox',
    download: false,
    print: false,
    filter: false,
    viewColumns: false,
    rowHover: false,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 25, 50, 100],
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
            title="Adicionar"
            onClick={handleMenuClick}
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
        customBodyRender: itemType => itemType
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
      name: 'showUnitField',
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
          return itemType === 'item' ? (
            <MoreHorizIcon
              key={tableMeta.columnIndex}
              onClick={() => handleOpenEditItem(itemId, tableMeta)}
            />
          ) : (
            <Link
              to={{
                pathname: '/templates/edit',
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
    <>
      <DialogMenu
        anchorEl={anchorElement}
        optionId={optionId}
        onSetAnchor={setAnchor}
        onClose={handleCloseMenu}
        onCreateItemClick={handleCreateItem}
      />
      <MuiDatatable
        title={
          <EditableLabel initialValue={option.name} onBlur={handleUpdateName} />
        }
        data={data}
        options={options}
        columns={columns}
      />{' '}
    </>
  );
};

Datatable.propTypes = {
  data: PropTypes.any.isRequired,
  optionId: PropTypes.string,
  onRowsDelete: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles)(Datatable));
