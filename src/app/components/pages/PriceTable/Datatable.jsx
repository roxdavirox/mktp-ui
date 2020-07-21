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
import {
  deletePriceTables,
  duplicatePriceTable
} from 'app/redux/actions/PriceTable.actions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';

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
    handleCloseMenu();
    dispatch(duplicatePriceTable(priceTableId, snack));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const ITEM_HEIGHT = 30;

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
            <div>
              <Button onClick={handleClickMenu}>
                <MoreHorizIcon key={tableMeta.columnIndex} />
              </Button>
              <Menu
                // id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    boxShadow: 'none'
                  }
                }}
              >
                <MenuItem
                  onClick={() => handleDuplicatePriceTable(priceTableId)}
                >
                  Duplicar
                </MenuItem>
                <MenuItem onClick={handleCloseMenu}>
                  <Link
                    to={{
                      pathname: `/prices/${priceTableId}`,
                      state: {
                        fromRedirect: true,
                        priceTableId
                      }
                    }}
                  >
                    Editar
                  </Link>
                </MenuItem>
              </Menu>
            </div>
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
