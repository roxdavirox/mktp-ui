/* eslint-disable no-console */
import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  SelectionState,
  TreeDataState,
  CustomTreeData
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn
} from '@devexpress/dx-react-grid-material-ui';

import { generateRows, defaultColumnValues } from './helpers/generator';

const getChildRows = (row, rootRows) => {
  const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
  return childRows.length ? childRows : null;
};

const Step2 = props => {
  const [columns, setColumns] = useState([{ name: 'name', title: 'Opção' }]);
  const [tableColumnExtensions] = useState([
    { columnName: 'name', width: 300 }
  ]);
  const [defaultExpandedRowIds] = useState([0]);
  const [rows, setRows] = useState(
    generateRows({
      columnValues: {
        id: ({ index }) => index,
        parentId: ({ index, random }) =>
          index > 0 ? Math.trunc((random() * index) / 2) : null,
        ...defaultColumnValues
      },
      length: 20
    })
  );
  console.log('rows:', rows);

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <SelectionState />
        <TreeDataState defaultExpandedRowIds={defaultExpandedRowIds} />
        <CustomTreeData getChildRows={getChildRows} />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
        <TableTreeColumn for="name" showSelectionControls />
      </Grid>
    </Paper>
  );
};

export default Step2;
