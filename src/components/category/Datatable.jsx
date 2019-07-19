/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import MuiDatatable from 'components/common/tables/MuiDatatable';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MoreHorizIcon from 'components/common/icons/MoreHorizIcon.jsx';
import { AddToolbar } from 'components/common/tables/Toolbar.jsx';
import { deleteCategories } from './actions';

const styles = {
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
};

const Datatable = ({ data, classes, onOpen, enqueueSnackbar: snack }) => {
  const dispatch = useDispatch();
  const handleRowsDelete = rows => {
    const { data: dataRows } = rows;

    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const rowIds = indexRows.map(index => data[index]._id);

    snack('Deletando...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    dispatch(deleteCategories(rowIds, snack));
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
        noMatch: 'Nenhuma categoria'
      }
    },
    customToolbar: function addCategory() {
      return <AddToolbar title="Adicionar categoria" onClick={onOpen} />;
    },
    onRowsDelete: rows => handleRowsDelete(rows)
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
      name: '_id',
      label: ' ',
      options: {
        sort: false,
        filter: false,
        // eslint-disable-next-line react/display-name
        customBodyRender: (value, tableMeta) => (
          <Link
            to={{
              pathname: '/admin/config/sub-categories',
              state: {
                fromRedirect: true,
                categoryId: value
              }
            }}
          >
            <MoreHorizIcon
              key={tableMeta.columnIndex}
              onClick={() => {
                // this.props.toggleOptionItems(value);
              }}
            />
          </Link>
        ),
        setCellProps: () => {
          return {
            className: classNames({ [classes.EditCell]: true })
          };
        }
      }
    }
  ];
  return <MuiDatatable data={data} columns={columns} options={options} />;
};

export default withStyles(styles)(Datatable);
