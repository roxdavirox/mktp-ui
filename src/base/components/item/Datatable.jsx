/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import MuiDatatable from 'base/components/common/tables/MuiDatatable';
import Toolbar from 'base/components/common/tables/Toolbar.jsx';
import { connect } from 'react-redux';
import { deleteItems } from './actions';

class Datatable extends React.Component {
  handleRowsDelete = rows => {
    const { enqueueSnackbar, data } = this.props;

    const { data: dataRows } = rows;

    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const deletedItemsIds = indexRows.map(index => data[index]._id);

    this.props.deleteItems(deletedItemsIds, enqueueSnackbar);
  };

  render = () => {
    const { data } = this.props;
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
            <Toolbar
              title="Adicionar Item"
              onClick={e => console.log('click no add item')}
              aria-owns="add-menu"
              aria-haspopup="true"
            />
          </>
        );
      },
      onRowsDelete: rowsDeleted => this.handleRowsDelete(rowsDeleted)
    };
    const columns = [
      {
        name: 'name',
        label: 'Item',
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
        <MuiDatatable data={data} options={options} columns={columns} />{' '}
      </div>
    );
  };
}

Datatable.propTypes = {
  data: PropTypes.any.isRequired,
  onRowsDelete: PropTypes.func.isRequired,
  deleteItems: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

const mapPropsToDispatch = {
  deleteItems
};

export default connect(
  null,
  mapPropsToDispatch
)(Datatable);
