/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import MuiDatatable from 'base/components/common/tables/MuiDatatable';
import Toolbar from 'base/components/common/tables/Toolbar.jsx';

const Datatable = props => {
  const { data } = props;
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
    onRowsDelete: rowsDeleted => props.onRowsDelete(rowsDeleted)
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

Datatable.propTypes = {
  data: PropTypes.any.isRequired,
  onRowsDelete: PropTypes.func.isRequired
};

export default Datatable;
