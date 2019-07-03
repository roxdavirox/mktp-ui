/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';

import { fetchOptions } from './actions';
import Datatable from './Datatable';
import Dialog from './Dialog';
import { getOptions } from './selectors';

const Page = props => {
  const [open, setOpen] = useState(false);
  const selectedData = useSelector(state => getOptions(state));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOptions());
  }, []);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {open && <Dialog open={open} onClose={handleClose} {...props} />}
      <Datatable data={selectedData} onOpen={handleOpen} />
    </>
  );
};

Page.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(Page);
