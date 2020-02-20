/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MuiDatatable from 'app/components/common/tables/MuiDatatable';
import MoreHorizIcon from 'app/components/common/icons/MoreHorizIcon.jsx';
import { AddToolbar } from 'app/components/common/tables/Toolbar.jsx';
import { deleteSubCategories } from 'app/redux/actions/Category.actions';

const useStyles = makeStyles({
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
});

const Datatable = ({ data, onOpen, enqueueSnackbar: snack, categoryId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleRowsDelete = rows => {
    const { data: dataRows } = rows;

    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const rowIds = indexRows.map(index => data[index]._id);

    snack('Deletando...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    dispatch(deleteSubCategories(rowIds, categoryId, snack));
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
        noMatch: 'Nenhuma categoria cadastrada'
      }
    },
    customToolbar: function addCategory() {
      return <AddToolbar title="Adicionar sub-categoria" onClick={onOpen} />;
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

        customBodyRender: function edit(value, tableMeta) {
          return (
            <Link
              to={{
                pathname: '/subcategories',
                state: {
                  fromRedirect: true,
                  categoryId: value
                }
              }}
            >
              <MoreHorizIcon key={tableMeta.columnIndex} />
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
  return <MuiDatatable data={data} columns={columns} options={options} />;
};

export default Datatable;
