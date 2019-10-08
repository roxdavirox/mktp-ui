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

const selectUnit = store => store.prices.unit;
const selectPriceTableName = store => store.prices.name;

const Datatable = ({
  enqueueSnackbar: snack,
  classes,
  data,
  priceTableId,
  onUpdate,
  onOpen
}) => {
  const dispatch = useDispatch();
  const unit = useSelector(store => selectUnit(store));
  const priceTable = useSelector(store => getPriceTableById(priceTableId, store));
  console.log('id da tabela de preço', priceTable);
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
    onUpdate(price);
  };

  const dataLength = data.length;

  const columns = [
    {
      name: 'start',
      label: `Inicio (${unit || 'unidade'})`,
      options: {
        filter: true,
        sort: true,
        setCellProps: () => {
          return {
            className: classNames({ [classes.NameCell]: true })
          };
        },
        customBodyRender: function renderFormatedValue(value, tableMeta) {
          const { rowIndex } = tableMeta;
          const isLastPriceInterval = rowIndex === dataLength - 1;
          return isLastPriceInterval ? (
            'Acima de: '
          ) : (
            <PriceFormat value={value} />
          );
        }
      }
    },
    {
      name: 'end',
      label: `Fim (${unit || 'unidade'})`,
      options: {
        filter: false,
        sort: false,
        setCellProps: () => {
          return {
            className: classNames({ [classes.NameCell]: true })
          };
        },
        customBodyRender: function renderFormatedValue(value, tableMeta) {
          const { rowIndex } = tableMeta;
          const isLastPriceInterval = rowIndex === dataLength - 1;
          const lastValue = isLastPriceInterval
            ? data[rowIndex - 1].end
            : value;
          return <PriceFormat value={lastValue} />;
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
            onClick={() => onOpen('add')}
          />
          <ViewListToolbar
            title="Gerar intervalos"
            onClick={() => onOpen('range')}
          />
        </>
      );
    },
    onRowsDelete: rowsDeleted => handleRowsDelete(rowsDeleted)
  };

  const priceTableName = useSelector(store => selectPriceTableName(store));

  return (
    <MuiDatatable
      title={<h2>Tabela de preço: {priceTableName}</h2>}
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
  onUpdate: PropTypes.func.isRequired
};

export default withStyles(styles)(Datatable);
