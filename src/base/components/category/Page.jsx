/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from './actions';
import { getCategories } from './selectors';
import Datatable from './Datatable';
import Dialog from './Dialog';

const Page = () => {
  const data = useSelector(state => getCategories(state));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <Dialog open={open} fnClose={() => setOpen(false)} />}
      <Datatable data={data} fnOpen={() => setOpen(true)} />
    </>
  );
};

export default Page;
