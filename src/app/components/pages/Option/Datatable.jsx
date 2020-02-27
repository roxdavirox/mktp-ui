import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
//Common components
import MuiDatatable from 'app/components/common/tables/MuiDatatable';
//Theme components
import MoreHorizIcon from 'app/components/common/icons/MoreHorizIcon.jsx';
import { AddToolbar } from 'app/components/common/tables/Toolbar.jsx';
import OptionLoading from './LoadingSkeleton';

import { deleteOptions } from 'app/redux/actions/Option.actions';

import { withSnackbar } from 'notistack';

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

  const handle

  const columns = [
    {
      name: 'name',
      label: 'Nome',
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
      name: '_id',
      label: ' ',
      options: {
        sort: false,
        filter: false,
        // eslint-disable-next-line react/display-name
        customBodyRender: (value, tableMeta) => (
          <Link
            to={{
              pathname: '/items',
              state: {
                fromRedirect: true,
                optionId: value
              }
            }}
          >
            <MoreHorizIcon key={tableMeta.columnIndex} />
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
  const options = {
    filterType: 'checkbox',
    download: false,
    print: false,
    filter: false,
    viewColumns: false,
    rowHover: false,
    textLabels: {
      body: {
        noMatch: <OptionLoading />
      }
    },
    customToolbar: function add() {
      return <AddToolbar title="Adicionar Opção" onClick={onOpen} />;
    },
    onRowsDelete: rowsDeleted => handleRowsDelete(rowsDeleted)
  };

  return (
    <>
      <MuiDatatable
        title={'Opções'}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
};

DataTable.propTypes = {
  data: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.any.isRequired,
  onOpen: PropTypes.func.isRequired
};

export default withSnackbar(withStyles(optionStyle)(DataTable));
