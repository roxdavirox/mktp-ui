/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';

import Datatable from './Datatable';
import Dialog from './Dialog';
import { fetchOptions, getOptions } from 'store/ducks/option';

const OptionPage = props => {
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

OptionPage.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(OptionPage);
