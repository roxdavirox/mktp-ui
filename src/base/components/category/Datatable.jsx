/* eslint-disable react/prop-types */
import React from 'react';
import MuiDatatable from 'base/components/common/tables/MuiDatatable';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MoreHorizIcon from 'base/components/common/icons/MoreHorizIcon.jsx';
import { AddToolbar } from 'base/components/common/tables/Toolbar.jsx';

const styles = {
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
};

const Datatable = props => {
  const { data, classes } = props;

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
        noMatch: 'Nenhuma categoria'
      }
    },
    customToolbar: function addCategory() {
      return <AddToolbar title="Adicionar Opção" onClick={props.fnOpen} />;
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
        // eslint-disable-next-line react/display-name
        customBodyRender: (value, tableMeta) => (
          <Link
            to={{
              pathname: '/admin/config/sub-categories',
              state: {
                fromRedirect: true,
                categoryId: value
              }
            }}
          >
            <MoreHorizIcon
              key={tableMeta.columnIndex}
              onClick={() => {
                // this.props.toggleOptionItems(value);
              }}
            />
          </Link>
        ),
        setCellProps: () => {
          return {
            className: classNames({ [classes.EditCell]: true })
          };
        }
      }
    }
  ];
  return <MuiDatatable data={data} columns={columns} options={options} />;
};

export default withStyles(styles)(Datatable);
