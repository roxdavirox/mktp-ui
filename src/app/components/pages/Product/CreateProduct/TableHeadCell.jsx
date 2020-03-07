/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const useStyles = makeStyles({
  TableCell: { fontWeight: 500, padding: '0 0 0 2em', cursor: 'pointer' }
});

const CustomTableHeadCell = props => {
  const [direction, setDirection] = useState('desc');
  const [active, setActive] = useState(false);

  useEffect(() => {
    setDirection(prev => (prev == 'desc' ? 'asc' : 'desc'));
  }, [props]);

  const classes = useStyles();
  const handleActive = () => {
    setActive(true);
    props.onClick(1);
  };

  const handleOnBlur = () => {
    setActive(false);
  };

  return (
    <TableCell
      className={classes.TableCell}
      onClick={handleActive}
      onBlur={handleOnBlur}
      // {...props}
    >
      <Tooltip title={props.children} placement="bottom">
        <span>
          <TableSortLabel
            hideSortIcon
            active={active}
            direction={direction}
            style={{ color: 'inherit' }}
          >
            {props.children}
          </TableSortLabel>
        </span>
      </Tooltip>
    </TableCell>
  );
};

export default CustomTableHeadCell;
