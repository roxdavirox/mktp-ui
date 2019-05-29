/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import MuiDatatable from 'base/components/common/tables/MuiDatatable';
import { withSnackbar } from 'notistack';

class Datatable extends React.Component {
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
            {Object.values(this.props.toolbars).map(Tool => (
              // eslint-disable-next-line react/jsx-key
              <Tool />
            ))}
          </>
        );
      },
      onRowsDelete: rowsDeleted => this.props.onRowsDelete(rowsDeleted)
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
  onRowsDelete: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  toolbars: PropTypes.array.isRequired
};

export default withSnackbar(Datatable);
