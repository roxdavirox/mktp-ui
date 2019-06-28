/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from './selectors';
import Datatable from './Datatable';

const Page = () => {
  const data = useSelector(state => getCategories(state));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'FETCH_CATEGORIES'
    });
  }, []);

  console.log('data', data);

  return <Datatable data={data} />;
};

export default Page;
