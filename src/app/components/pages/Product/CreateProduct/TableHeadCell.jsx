/* eslint-disable react/display-name */
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  TableCell: { fontWeight: 500, padding: '0 0 0 2em', cursor: 'pointer' }
});

const CustomTableHeadCell = props => {
  const classes = useStyles();
  return <TableCell classNames={classes.TableCell} {...props} />;
};

export default CustomTableHeadCell;
