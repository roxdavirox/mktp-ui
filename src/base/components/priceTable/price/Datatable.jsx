/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MuiDatatable from 'base/components/common/tables/MuiDatatable';
import MoreHorizIcon from 'base/components/common/icons/MoreHorizIcon.jsx';
import { AddToolbar } from 'base/components/common/tables/Toolbar.jsx';
import Loading from './Loading';
import ViewListIcon from '../../common/icons/ViewListIcon';

const styles = {
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
};

class Datatable extends React.Component {
  handleRowsDelete = rows => {
    const { enqueueSnackbar, data } = this.props;

    const { data: dataRows } = rows;

    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const priceIds = indexRows.map(index => data[index]._id);

    enqueueSnackbar('Deletando...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    this.props.deletePrices(priceIds, enqueueSnackbar);
  };

  handleRowUpdate = (priceId, tableMeta) => {
    console.log('id preço:', priceId);
    console.log('meta:', tableMeta);
    const [start, end, value, _id] = tableMeta.rowData;
    const price = { start, end, value, _id };
    this.props.fnUpdate(price);
  };

  render = () => {
    const { data, fnOpen } = this.props;
    const columns = [
      {
        name: 'start',
        label: 'Inicio',
        options: {
          filter: true,
          sort: true,
          setCellProps: () => {
            return {
              className: classNames({ [this.props.classes.NameCell]: true })
            };
          }
        }
      },
      {
        name: 'end',
        label: 'Fim',
        options: {
          filter: true,
          sort: true,
          setCellProps: () => {
            return {
              className: classNames({ [this.props.classes.NameCell]: true })
            };
          }
        }
      },
      {
        name: 'value',
        label: 'Preço',
        options: {
          filter: true,
          sort: true,
          setCellProps: () => {
            return {
              className: classNames({ [this.props.classes.NameCell]: true })
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
            <MoreHorizIcon
              key={tableMeta.columnIndex}
              onClick={() => {
                this.handleRowUpdate(value, tableMeta);
              }}
            />
          ),
          setCellProps: () => {
            return {
              className: classNames({ [this.props.classes.EditCell]: true })
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
          noMatch: <Loading />
        }
      },
      customToolbar: () => {
        return (
          <>
            <AddToolbar
              title="Adicionar Tabela de preço"
              onClick={() => fnOpen('add')}
            />
            <ViewListIcon
              title="Gerar intervalos"
              onClick={() => fnOpen('range')}
            />
          </>
        );
      },
      onRowsDelete: rowsDeleted => this.handleRowsDelete(rowsDeleted)
    };

    return (
      <MuiDatatable
        title={'Intervalos dos preços'}
        data={this.props.prices}
        columns={columns}
        options={options}
      />
    );
  };
}

Datatable.propTypes = {
  data: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.any.isRequired,
  fnOpen: PropTypes.func.isRequired,
  fnUpdate: PropTypes.func.isRequired,
  deletePrices: PropTypes.func.isRequired
};

export default withStyles(styles)(Datatable);
