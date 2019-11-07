/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withSnackbar } from 'notistack';
import history from 'providers/history';
import { fetchCategories, getSubcategories } from 'store/ducks/category';
import Datatable from './Datatable';
import Dialog from './Dialog';

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
    </>
  );
};

export default withSnackbar(SubCategoryPage);
