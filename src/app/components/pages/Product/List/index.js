/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { Breadcrumb } from 'matx';
import { getEndpoint, createDeleteRequest } from 'helpers/api';
import ProductDatatable from './ProductDatatable';
import { withSnackbar } from 'notistack';

const mapProduct = ({ _id, name }) => ({ _id, name });

const mapProductNames = products => products.map(mapProduct);

const ProductPage = ({ enqueueSnackbar: snack }) => {
  const [productNames, setProductNames] = useState([]);
  const [isLoading, setLoadingState] = useState(false);

  useEffect(() => {
    const endpoint = getEndpoint('/products');
    fetch(endpoint)
      .then(res => res.json())
      .then(mapProductNames)
      .then(setProductNames)
      .then(() => setLoadingState(false));
  }, []);

  const handleRowsDelete = rows => {
    const { data: dataRows } = rows;

    const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    const productsId = indexRows.map(index => productNames[index]._id);
    snack('Deletando...', {
      variant: 'info',
      autoHideDuration: 2000
    });

    const request = createDeleteRequest({ productsId });
    const endpoint = getEndpoint('/products');

    fetch(endpoint, request)
      .then(res => res.json())
      .then(res => {
        const { deletedItemsCount: count } = res;
        if (count) {
          const msg = `${count} produt${
            count == 1 ? 'o deletado' : 's deletados'
          }`;
          snack(msg, {
            variant: 'success',
            autoHideDuration: 2000
          });
          const filterDeletedProducts = p => productsId.indexOf(p._id) === -1;
          const _productsNames = productNames.filter(filterDeletedProducts);
          setProductNames(_productsNames);
        }
        return res;
      })
      .catch(error => console.log('erro ao deletar item:', error));
  };

  return (
    <Container maxWidth="xl" className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb routeSegments={[{ name: 'Produtos', path: '/products' }]} />
      </div>
      <ProductDatatable
        products={productNames}
        onRowsDelete={handleRowsDelete}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default withSnackbar(ProductPage);
