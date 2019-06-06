/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import MuiDatatable from 'base/components/common/tables/MuiDatatable';
import {
  AddToolbar,
  BallotToolbar
} from 'base/components/common/tables/Toolbar';
import MoreHorizIcon from 'base/components/common/icons/MoreHorizIcon.jsx';

class Datatable extends React.Component {
  handleRowUpdate = (itemId, tableMeta) => {
    const [name, _id] = tableMeta.rowData;
    const item = { name, _id };
    console.log('item update:', item);
    // this.props.fnUpdate(item);
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
            <AddToolbar
              title="Adicionar Item"
              onClick={() => this.props.fnOpen('add')}
              aria-owns="add-menu"
              aria-haspopup="true"
            />
            <BallotToolbar
              title="Adicionar Itens existentes"
              onClick={() => this.props.fnOpen('existing')}
              aria-owns="add-menu"
              aria-haspopup="true"
            />
          </>
        );
      },
      onRowsDelete: rowsDeleted => this.props.fnRowsDelete(rowsDeleted)
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
          sort: false,
          filter: false,
          customBodyRender: (value, tableMeta) => (
            <MoreHorizIcon
              key={tableMeta.columnIndex}
              onClick={() => {
                this.handleRowUpdate(value, tableMeta);
              }}
            />
          )
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
  fnRowsDelete: PropTypes.func.isRequired,
  fnOpen: PropTypes.func.isRequired,
  fnUpdate: PropTypes.func.isRequired
};

export default withSnackbar(Datatable);
