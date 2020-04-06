import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MuiDatatable from 'app/components/common/tables/MuiDatatable';
import MoreHorizIcon from 'app/components/common/icons/MoreHorizIcon.jsx';
import { AddToolbar } from 'app/components/common/tables/Toolbar.jsx';
import Loading from './LoadingSkeleton';
import { deletePriceTables } from 'app/redux/actions/PriceTable.actions';

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
    customToolbar: function addPriceTable() {
      return <AddToolbar title="Adicionar Tabela de preço" onClick={onOpen} />;
    },
    onRowsDelete: rowsDeleted => handleRowsDelete(rowsDeleted)
  };

  return (
    <MuiDatatable
      title={<h2>Tabelas de preço</h2>}
      data={data}
      columns={columns}
      options={options}
    />
  );
};

Datatable.propTypes = {
  data: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.any.isRequired,
  onOpen: PropTypes.func.isRequired
};

export default withStyles(styles)(Datatable);
