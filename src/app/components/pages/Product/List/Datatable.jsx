import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { AddToolbar } from 'app/components/common/tables/Toolbar.jsx';
import MoreHorizIcon from 'app/components/common/icons/MoreHorizIcon.jsx';
import MuiDatatable from 'app/components/common/tables/MuiDatatable';
import Loading from './LoadingSkeleton';
const useStyles = makeStyles({ EditCell: { textAlign: 'right' } });

// eslint-disable-next-line react/prop-types
const ProductDatatable = ({ products, onRowsDelete, isLoading }) => {
  const classes = useStyles();

  const options = {
    onRowsDelete,
    filterType: 'checkbox',
    download: false,
    print: false,
    filter: false,
    viewColumns: false,
    rowHover: false,
    textLabels: {
      body: {
        noMatch: <Loading isLoading={isLoading} />
      }
    },
    customToolbar: function add() {
      return (
        <Link
          to={{
            pathname: '/products/create'
          }}
        >
          <AddToolbar title="Criar novo produto" />
        </Link>
      );
    }
  };
  const columns = [
    {
      name: 'name',
      label: 'Produto',
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
        customBodyRender: (productId, tableMeta) => (
          <Link
            to={{
              pathname: '/products/edit',
              state: {
                productId
              }
            }}
          >
            <MoreHorizIcon key={tableMeta.columnIndex} />
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

  return <MuiDatatable data={products} options={options} columns={columns} />;
};

export default ProductDatatable;
