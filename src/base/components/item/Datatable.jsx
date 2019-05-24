/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import MuiDatatable from 'base/components/common/tables/MuiDatatable';
import { connect } from 'react-redux';
import { deleteItems } from './actions';
import { withSnackbar } from 'notistack';
import { NEW_ITEM, EXISTING_ITEM } from './actions';

class Datatable extends React.Component {
  handleRowsDelete = rows => {
    const { enqueueSnackbar, data } = this.props;

    const { data: dataRows } = rows;
    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const deletedItemsIds = indexRows.map(index => data[index]._id);

    enqueueSnackbar('Deletando...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    this.props.deleteItems(deletedItemsIds, enqueueSnackbar);
  };

  render = () => {
    const { data, onDialog } = this.props;
    const options = {
      filterType: 'checkbox',
      download: false,
      print: false,
      filter: false,
      viewColumns: false,
      rowHover: false,
      rowsPerPageOptions: [5, 10, 15],
      rowsPerPage: 5,
      responsive: 'stacked',
      textLabels: {
        body: {
          noMatch: 'Nenhum item'
        }
      },
      customToolbar: () => {
        return (
          <>
            {Object.values(this.props.toolbars).map(Tool => (
              // eslint-disable-next-line react/jsx-key
              <Tool />
            ))}
          </>
        );
      },
      onRowsDelete: rowsDeleted => this.handleRowsDelete(rowsDeleted)
    };
    const columns = [
      {
        name: 'name',
        label: 'Nome',
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: '_id',
        label: ' ',
        options: {
          display: 'false',
          sort: false,
          filter: false
        }
      }
    ];
    return (
      <div>
        <MuiDatatable
          title="Itens"
          data={data}
          options={options}
          columns={columns}
        />{' '}
      </div>
    );
  };
}

Datatable.propTypes = {
  data: PropTypes.any.isRequired,
  deleteItems: PropTypes.func.isRequired,
  onDialog: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  toolbars: PropTypes.array.isRequired
};

const mapPropsToDispatch = {
  deleteItems
};

const snackDatatable = withSnackbar(Datatable);

export default connect(
  null,
  mapPropsToDispatch
)(snackDatatable);
