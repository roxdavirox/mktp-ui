import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import MuiDatatable from 'components/common/tables/MuiDatatable';
import { Link } from 'react-router-dom';
import MoreHorizIcon from 'components/common/icons/MoreHorizIcon.jsx';

const useStyles = makeStyles({ EditCell: { textAlign: 'right' } });

// eslint-disable-next-line react/prop-types
const ProductDatatable = ({ products, onRowsDelete }) => {
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
        noMatch: <p>sem dados</p>
      }
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
        customBodyRender: (value, tableMeta) => (
          <Link
            to={{
              pathname: '/admin/config/products/edit',
              state: {
                productId: value
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
