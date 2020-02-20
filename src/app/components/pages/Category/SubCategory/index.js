/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import { withSnackbar } from 'notistack';
import { Breadcrumb } from 'matx';
import history from 'history.js';
import Datatable from './Datatable';
import Dialog from './Dialog';
import { fetchCategories } from 'app/redux/actions/Category.actions';
import { getSubcategories } from 'app/redux/selectors/Category.selectors';

const getCategoryId = () => {
  const { state } = history.location;
  const { categoryId } = state;
  return categoryId;
};

const SubCategoryPage = props => {
  const categoryId = getCategoryId();
  const dispatch = useDispatch();
  useEffect(() => {
    const pageRefreshed =
      window.performance && performance.navigation.type == 1;
    if (pageRefreshed) {
      dispatch(fetchCategories());
    }
  }, []);

  const data = useSelector(state => getSubcategories(categoryId, state));

  const [open, setOpen] = useState(false);
  return (
    <>
      <Container maxWidth="xl" className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[{ name: 'Categorias', path: '/categories' }]}
          />
        </div>
        {open && (
          <Dialog
            open={open}
            categoryId={categoryId}
            onClose={() => setOpen(false)}
          />
        )}
        <Datatable
          data={data}
          categoryId={categoryId}
          onOpen={() => setOpen(true)}
          {...props}
        />
      </Container>
    </>
  );
};

export default withSnackbar(SubCategoryPage);
