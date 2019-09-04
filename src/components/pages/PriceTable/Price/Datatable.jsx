/* eslint-disable no-console */
import React from 'react';
import { useDispatch } from 'react-redux';
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

const styles = {
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
};

const Datatable = ({
  enqueueSnackbar: snack,
  classes,
  data,
  onUpdate,
  onOpen
}) => {
  const dispatch = useDispatch();

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
    console.log('id preço:', priceId);
    console.log('meta:', tableMeta);
    const [start, end, value, _id] = tableMeta.rowData;
    const price = { start, end, value, _id };
    onUpdate(price);
  };

  const columns = [
    {
      name: 'start',
      label: 'Inicio',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => {
          return {
            className: classNames({ [classes.NameCell]: true })
          };
        },
        customBodyRender: function renderFormatedValue(value) {
          return <PriceFormat value={value} />;
        }
      }
    },
    {
      name: 'end',
      label: 'Fim',
      options: {
        filter: false,
        sort: false,
        setCellProps: () => {
          return {
            className: classNames({ [classes.NameCell]: true })
          };
        },
        customBodyRender: function renderFormatedValue(value) {
          return <PriceFormat value={value} />;
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

  return (
    <MuiDatatable
      title={'Intervalos dos preços'}
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
