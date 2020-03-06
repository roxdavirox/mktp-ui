/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
  TableCell: { fontWeight: 500, padding: '0 0 0 2em', cursor: 'pointer' }
});

const CustomTableHeadCell = props => {
  const classes = useStyles();
  return (
    <TableCell className={classes.TableCell} {...props}>
      <Tooltip title={props.children} placement="bottom">
        <span>{props.children}</span>
      </Tooltip>
    </TableCell>
  );
};

export default CustomTableHeadCell;
