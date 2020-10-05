/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MuiDatatable from 'app/components/common/tables/MuiDatatable';
import BraziliaPriceFormat from 'app/components/common/format/NumberFormat/BraziliaPriceFormat';
import PriceFormat from 'app/components/common/format/NumberFormat/PriceFormat';
import MoreHorizIcon from 'app/components/common/icons/MoreHorizIcon.jsx';
import {
  AddToolbar,
  ViewListToolbar,
  MoreToolbar,
  AddPortcetage
} from 'app/components/common/tables/Toolbar.jsx';
import DialogMenu from './DialogMenu';
import Loading from './Loading';
import { deletePrices } from 'app/redux/actions/Price.actions';
import { updatePriceTable } from 'app/redux/actions/PriceTable.actions';
import { getPriceTableById } from 'app/redux/selectors/PriceTable.selectors';
import EditableLabel from 'app/components/common/labels/EditableLabel';

const styles = {
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
};

const Datatable = ({
  enqueueSnackbar: snack,
  classes,
  data,
  onUpdate,
  onOpen: openDialogType,
  priceTableId
}) => {
  const dispatch = useDispatch();
  const [anchorElement, setAnchor] = useState(null);

  const priceTable = useSelector(store =>
    getPriceTableById(priceTableId, store)
  );

  const handleRowsDelete = rows => {
    const { data: dataRows } = rows;

    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const priceIds = indexRows.map(index => data[index]._id);

    snack('Deletando...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    dispatch(deletePrices(priceIds, snack));
  };

  const handleRowUpdate = (priceId, tableMeta) => {
    const [start, end, value, _id] = tableMeta.rowData;
    const price = { start, end, value, _id };
    const dialogType =
      priceTable.unit === 'quantidade' ? 'EDIT_PRICE_QUANTITY' : 'EDIT_PRICE';
    onUpdate(price, dialogType);
  };

  const handleMenuClick = e => setAnchor(e.currentTarget);

  const dataLength = data.length;

  const columns = [
    {
      name: 'start',
      label: `Inicio (${priceTable.unit || 'unidade'})`,
      options: {
        filter: true,
        sort: true,
        setCellProps: () => {
          return {
            className: classNames({ [classes.NameCell]: true })
          };
        },
        customBodyRender: function renderFormatedValue(value, tableMeta) {
          if (data.length <= 1) {
            return priceTable.unit === 'quantidade' ? (
              value
            ) : (
              <PriceFormat value={value} />
            );
          }
          const { rowIndex } = tableMeta;
          const isLastPriceInterval = rowIndex === dataLength - 1;
          return isLastPriceInterval ? (
            'Acima de: '
          ) : priceTable.unit === 'quantidade' ? (
            value
          ) : (
            <PriceFormat value={value} />
          );
        }
      }
    },
    {
      name: 'end',
      label: `Fim (${priceTable.unit || 'unidade'})`,
      options: {
        filter: false,
        sort: false,
        setCellProps: () => {
          return {
            className: classNames({ [classes.NameCell]: true })
          };
        },
        customBodyRender: function renderFormatedValue(value, tableMeta) {
          if (data.length <= 1) {
            return priceTable.unit === 'quantidade' ? (
              value
            ) : (
              <PriceFormat value={value} />
            );
          }
          const { rowIndex } = tableMeta;
          const isLastPriceInterval = rowIndex === dataLength - 1;
          const lastValue = isLastPriceInterval
            ? data[rowIndex - 1].end
            : value;
          return priceTable.unit === 'quantidade' ? (
            lastValue
          ) : (
            <PriceFormat value={lastValue} />
          );
        }
      }
    },
    {
      name: 'value',
      label: 'Preço',
      options: {
        filter: false,
        sort: false,
        setCellProps: () => {
          return {
            className: classNames({ [classes.NameCell]: true })
          };
        },
        customBodyRender: function renderFormatedValue(value) {
          return <BraziliaPriceFormat value={value} />;
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
          <MoreHorizIcon
            key={tableMeta.columnIndex}
            onClick={() => {
              handleRowUpdate(value, tableMeta);
            }}
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
  const options = {
    filterType: 'checkbox',
    download: false,
    print: false,
    sort: true,
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
    customToolbar: function datatableButtons() {
      return (
        <>
          <AddToolbar
            title="Adicionar novo preço"
            onClick={() =>
              openDialogType(
                priceTable.unit === 'quantidade'
                  ? 'ADD_PRICE_QUANTITY'
                  : 'ADD_PRICE'
              )
            }
          />
          {priceTable.unit === 'quantidade' ? (
            <ViewListToolbar
              title="Gerar intervalos"
              onClick={() => openDialogType('GENERATE_PRICE_QTY')}
            />
          ) : (
            <MoreToolbar
              title="Gerar intervalos"
              onClick={e => {
                // openDialogType(
                //   priceTable.unit === 'quantidade'
                //     ? 'GENERATE_PRICE_QTY'
                //     : 'GENERATE_PRICE'
                // );
                handleMenuClick(e);
              }}
            />
          )}
          <AddPortcetage
            title="Atualizar intervalos"
            onClick={() => openDialogType('ATUALIZAR_INTERVALOS')}
          />
        </>
      );
    },
    onRowsDelete: rowsDeleted => handleRowsDelete(rowsDeleted)
  };
  const handleCloseMenu = () => setAnchor(null);

  const handleOpenSimpleMenu = () => {
    openDialogType('GENERATE_PRICE_SIMPLE');
    handleCloseMenu();
  };

  const hanleOpenSpecificMenu = () => {
    openDialogType('GENERATE_PRICE');
    handleCloseMenu();
  };

  const handleUpdateName = name => {
    if (name == priceTable.name) return;
    dispatch(updatePriceTable(priceTableId, name, snack));
  };

  return (
    <>
      <DialogMenu
        onSimpleClick={handleOpenSimpleMenu}
        onSpecificClick={hanleOpenSpecificMenu}
        anchorEl={anchorElement}
        onSetAnchor={setAnchor}
        onClose={handleCloseMenu}
      />
      <MuiDatatable
        title={
          <EditableLabel
            initialValue={priceTable.name}
            onBlur={handleUpdateName}
          />
        }
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
  onOpen: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  priceTableId: PropTypes.string,
  location: PropTypes.object.isRequired
};

export default withStyles(styles)(Datatable);
