/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import MoreHorizIcon from 'components/common/icons/MoreHorizIcon.jsx';
import MuiDatatable from 'components/common/tables/MuiDatatable';
import { getEndpoint } from 'helpers/api';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({ EditCell: { textAlign: 'right' } });

const mapProduct = ({ _id, name }) => ({ _id, name });

const mapProductNames = products => products.map(mapProduct);

const ProductListPage = () => {
  const classes = useStyles();
  const [productNames, setProductNames] = useState([]);
  const [showSlide, setSlideShow] = useState(false);

  useEffect(() => {
    const endpoint = getEndpoint('/products');
    fetch(endpoint)
      .then(res => res.json())
      .then(mapProductNames)
      .then(setProductNames)
      .then(() => setSlideShow(true));
  }, []);

  const options = {
    filterType: 'checkbox',
    download: false,
    print: false,
    filter: false,
    viewColumns: false,
    rowHover: false,
    textLabels: {
      body: {
        noMatch: <h1>sem dados</h1>
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
              pathname: '/admin',
              state: {
                value
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

  return (
    productNames &&
    showSlide && (
      <Slide direction="left" in={showSlide} mountOnEnter unmountOnExit>
        <div>
          <MuiDatatable
            data={productNames}
            options={options}
            columns={columns}
          />
        </div>
      </Slide>
    )
  );
};

export default ProductListPage;
