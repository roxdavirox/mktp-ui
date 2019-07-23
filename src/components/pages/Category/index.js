/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, getCategories } from 'store/ducks/category';
import Datatable from './Datatable';
import Dialog from './Dialog';
import { withSnackbar } from 'notistack';

const CategoryPage = props => {
  const data = useSelector(state => getCategories(state));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <Dialog open={open} onClose={() => setOpen(false)} />}
      <Datatable data={data} onOpen={() => setOpen(true)} {...props} />
    </>
  );
};

export default withSnackbar(CategoryPage);
