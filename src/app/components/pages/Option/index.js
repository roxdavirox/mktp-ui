/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';

import { Breadcrumb } from 'matx';

import Datatable from './Datatable';
import Dialog from './Dialog';
import { fetchOptions } from 'app/redux/actions/Option.actions';
import { getOptions } from 'app/redux/selectors/Option.selectors';

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
      <Container maxWidth="xl" className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: 'Opções', path: '/options' }]} />
        </div>
        {open && <Dialog open={open} onClose={handleClose} {...props} />}
        <Datatable data={selectedData} onOpen={handleOpen} />
      </Container>
    </>
  );
};

OptionPage.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(OptionPage);
