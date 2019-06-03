import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MuiDatatable from 'base/components/common/tables/MuiDatatable';
import MoreHorizIcon from 'base/components/common/icons/MoreHorizIcon.jsx';
import { AddToolbar } from 'base/components/common/tables/Toolbar.jsx';
import Loading from './Loading';

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

  render = () => {
    const { data, onDialog } = this.props;
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
                // this.props.toggleOptionItems(value);
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
          <AddToolbar title="Adicionar Tabela de preço" onClick={onDialog} />
        );
      },
      onRowsDelete: rowsDeleted => this.handleRowsDelete(rowsDeleted)
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
}

Datatable.propTypes = {
  data: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.any.isRequired,
  onDialog: PropTypes.func.isRequired,
  deletePrices: PropTypes.func.isRequired
};

export default withStyles(styles)(Datatable);
