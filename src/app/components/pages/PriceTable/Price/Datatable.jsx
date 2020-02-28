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
  MoreToolbar
} from 'app/components/common/tables/Toolbar.jsx';
import DialogMenu from './DialogMenu';

import Loading from './Loading';
import { deletePrices } from 'app/redux/actions/Price.actions';
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
  location
}) => {
  const dispatch = useDispatch();
  const [anchorElement, setAnchor] = useState(null);
  const {
    state: { priceTableId }
  } = location;

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
        title={<EditableLabel text={priceTable.name} />}
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
