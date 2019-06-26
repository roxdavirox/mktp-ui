/* eslint-disable no-console */
import React from 'react';
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
  console.log('row', row, 'rootRows', rootRows);
  const childRows = rootRows.filter(r => r.parentId == (row ? row.id : null));
  return childRows.length ? childRows : null;
};
const generateTree = prevOptions => {
  const options = prevOptions.map(op => ({
    id: op._id,
    name: op.name,
    parentId: null,
    items: op.items.map(item => ({
      id: item._id,
      parentId: op._id,
      name: item.name
    }))
  }));

  const newOptions = options.map(o => ({ id: o.id, name: o.name }));
  const newItems = options.map(o => o.items);
  const rows = newItems.reduce((rows, row) => {
    return [...rows, ...row];
  }, newOptions);

  return rows;
};

class OptionStep extends React.Component {
  state = {
    columns: [{ name: 'name', title: 'Opção' }],
    data: [],
    tableColumnExtensions: [{ columnName: 'name', width: 300 }],
    defaultExpandedRowIds: [0],
    selection: []
  };

  sendState() {
    return this.state;
  }
  componentDidMount = async () => {
    const host = process.env.REACT_APP_HOST_API;

    const response = await fetch(`${host}/options`);
    const data = await response.json();
    const { options } = data;
    const rows = generateTree(options);
    this.setState({ data: rows });
  };
  isValidated() {
    return true;
  }
  render() {
    const {
      data,
      columns,
      defaultExpandedRowIds,
      tableColumnExtensions
    } = this.state;

    return (
      <>
        <Paper>
          <Grid rows={data} columns={columns}>
            <SelectionState
              onSelectionChange={selection => this.setState({ selection })}
            />
            <TreeDataState defaultExpandedRowIds={defaultExpandedRowIds} />
            <CustomTreeData getChildRows={getChildRows} />
            <Table columnExtensions={tableColumnExtensions} />
            <TableHeaderRow />
            <TableTreeColumn for="name" showSelectionControls />
          </Grid>
        </Paper>
      </>
    );
  }
}

export default OptionStep;
