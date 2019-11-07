/* eslint-disable no-console */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MuiDatatable from 'components/common/tables/MuiDatatable';
import BraziliaPriceFormat from 'components/common/format/NumberFormat/BraziliaPriceFormat';
import PriceFormat from 'components/common/format/NumberFormat/PriceFormat';
import MoreHorizIcon from 'components/common/icons/MoreHorizIcon.jsx';
import {
  AddToolbar,
  ViewListToolbar
} from 'components/common/tables/Toolbar.jsx';

import Loading from './Loading';
import { deletePrices } from 'store/ducks/price';
import { getPriceTableById } from 'store/ducks/priceTable';

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
  location
}) => {
  const dispatch = useDispatch();
  const {
    state: { priceTableId }
  } = location;

  console.log('location', location);
  const priceTable = useSelector(store =>
    getPriceTableById(priceTableId, store)
  );
  console.log('priceTable', priceTable);

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
          console.log('tableMeta:', tableMeta);
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
          <ViewListToolbar
            title="Gerar intervalos"
            onClick={() =>
              openDialogType(
                priceTable.unit === 'quantidade'
                  ? 'GENERATE_PRICE_QTY'
                  : 'GENERATE_PRICE'
              )
            }
          />
        </>
      );
    },
    onRowsDelete: rowsDeleted => handleRowsDelete(rowsDeleted)
  };

  return (
    <MuiDatatable
      title={<h2>Tabela de preço: {priceTable.name}</h2>}
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
  onOpen: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  priceTableId: PropTypes.string,
  location: PropTypes.object.isRequired
};

export default withStyles(styles)(Datatable);
