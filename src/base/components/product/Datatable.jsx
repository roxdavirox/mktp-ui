/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { TreeDataState, CustomTreeData } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn
} from '@devexpress/dx-react-grid-material-ui';

const getChildRows = (row, rootRows) => {
  console.log('row', row, 'rootRows', rootRows);
  const childRows = rootRows.filter(r => r.parentId == (row ? row.id : null));
  return childRows.length ? childRows : null;
};

const Datatable = props => {
  const { data } = props;
  const [columns] = useState([{ name: 'name', title: 'Nome' }]);
  const [tableColumnExtensions] = useState([
    { columnName: 'name', width: 300 }
  ]);

  return (
    <Paper>
      <Grid rows={data} columns={columns}>
        <TreeDataState />
        <CustomTreeData getChildRows={getChildRows} />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
        <TableTreeColumn for="name" />
      </Grid>
    </Paper>
  );
};

export default Datatable;
