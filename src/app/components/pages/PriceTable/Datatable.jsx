import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import MuiDatatable from 'app/components/common/tables/MuiDatatable';
import MoreHorizIcon from 'app/components/common/icons/MoreHorizIcon.jsx';
import DeleteIcon from '@material-ui/icons/Delete';
import ControlPointDuplicateIcon from '@material-ui/icons/ControlPointDuplicate';
import { AddToolbar } from 'app/components/common/tables/Toolbar.jsx';
import Loading from './LoadingSkeleton';
import {
  deletePriceTables,
  duplicatePriceTable
} from 'app/redux/actions/PriceTable.actions';
import Button from '@material-ui/core/Button';

const styles = {
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
};

const Datatable = ({ enqueueSnackbar: snack, classes, data, onOpen }) => {
  const dispatch = useDispatch();

  const handleRowsDelete = rows => {
    const { data: dataRows } = rows;

    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const priceTableIds = indexRows.map(index => data[index]._id);

    snack('Deletando...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    dispatch(deletePriceTables(priceTableIds, snack));
  };

  const handleDuplicatePriceTable = priceTableId => {
    snack('Duplicando...', {
      variant: 'info',
      autoHideDuration: 2000
    });
    dispatch(duplicatePriceTable(priceTableId, snack));
  };

  const columns = [
    {
      name: 'name',
      label: 'Name',
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
      name: 'unit',
      label: 'Tipo de unidade',
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
        customBodyRender: (priceTableId, tableMeta) => {
          return (
            <Link
              to={{
                pathname: `/prices/${priceTableId}`,
                state: {
                  fromRedirect: true,
                  priceTableId
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

  const options = {
    filterType: 'checkbox',
    download: false,
    print: false,
    filter: false,
    viewColumns: false,
    rowHover: false,
    rowsPerPage: 50,
    rowsPerPageOptions: [10, 25, 50, 100],
    textLabels: {
      body: {
        noMatch: <Loading />
      }
    },
    // eslint-disable-next-line react/display-name
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <div>
        <Button onClick={() => console.log(selectedRows)}>
          <ControlPointDuplicateIcon />
        </Button>
        <Button onClick={() => handleRowsDelete(selectedRows)}>
          <DeleteIcon />
        </Button>
      </div>
    ),
    customToolbar: function addPriceTable() {
      return <AddToolbar title="Adicionar Tabela de preço" onClick={onOpen} />;
    }
  };

  return (
    <>
      <MuiDatatable
        title={<h2>Tabelas de preço</h2>}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
};

Datatable.propTypes = {
  data: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.any.isRequired,
  onOpen: PropTypes.func.isRequired
};

export default withStyles(styles)(Datatable);
