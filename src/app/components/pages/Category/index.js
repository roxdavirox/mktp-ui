/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@material-ui/core/Container';
import { withSnackbar } from 'notistack';
import Datatable from './Datatable';
import Dialog from './Dialog';
import { fetchCategories } from 'app/redux/actions/Category.actions';
import { getCategories } from 'app/redux/selectors/Category.selectors';

const CategoryPage = props => {
  const data = useSelector(state => getCategories(state));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const [open, setOpen] = useState(false);
  return (
    <>
      <Container maxWidth="xl">
        {open && <Dialog open={open} onClose={() => setOpen(false)} />}
        <Datatable data={data} onOpen={() => setOpen(true)} {...props} />
      </Container>
    </>
  );
};

export default withSnackbar(CategoryPage);
