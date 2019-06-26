/* eslint-disable no-console */
import React from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
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
// theme components
import GridContainer from 'base/components/theme/Grid/GridContainer.jsx';
import GridItem from 'base/components/theme/Grid/GridItem.jsx';
// import { generateRows, defaultColumnValues } from './helpers/generator';

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

const style = {
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center'
  }
};

class OptionStep extends React.Component {
  state = {
    columns: [{ name: 'name', title: 'Opção' }],
    data: [],
    tableColumnExtensions: [{ columnName: 'name', width: 300 }],
    defaultExpandedRowIds: [0],
    selectionIds: [0, 2, 3]
  };

  componentDidMount = async () => {
    const host = process.env.REACT_APP_HOST_API;

    const response = await fetch(`${host}/options`);
    const data = await response.json();
    const { options } = data;
    const rows = generateTree(options);
    this.setState({ data: rows });
  };
  handleSelectionChange = selection => {
    if (selection.length < 0) return;
    const { data } = this.state;

    const rows = selection
      .map(rowId => ({
        ...data[rowId],
        optionIndex: data[rowId].parentId
          ? _.indexOf(data, data.find(d => d.id === data[rowId].parentId))
          : -1
      }))
      .filter(row => row.optionIndex >= 0);

    const optionIds = rows.map(option => option.optionIndex);
    const newOptionIds = _.uniq(optionIds);
    console.log('optionsId', newOptionIds);
    console.log(rows);
    console.log(selection);
    this.setState({
      selectionIds: _.uniq([...selection, ...newOptionIds])
    });
  };

  sendState() {
    // retornar os itens selecionados
    const { data, selectionIds } = this.state;
    if (!data) return this.state;
    const options = selectionIds.map(rowId => data[rowId]);
    const newOptions = options.filter(o => !o.parentId && o.id);
    const newItems = newOptions.map(o => ({
      ...o,
      items: options
        .filter(op => op.parentId && op.parentId === o.id)
        .map(item => item)
    }));
    return newItems;
  }
  isValidated() {
    return true;
  }
  render() {
    const {
      data,
      columns,
      selectionIds,
      defaultExpandedRowIds,
      tableColumnExtensions
    } = this.state;
    const { classes } = this.props;
    return (
      <>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12}>
            <Paper>
              <Grid rows={data} columns={columns}>
                <SelectionState
                  selection={selectionIds}
                  onSelectionChange={this.handleSelectionChange}
                />
                <TreeDataState defaultExpandedRowIds={defaultExpandedRowIds} />
                <CustomTreeData getChildRows={getChildRows} />
                <Table columnExtensions={tableColumnExtensions} />
                <TableHeaderRow />
                <TableTreeColumn for="name" showSelectionControls />
              </Grid>
            </Paper>
          </GridItem>
        </GridContainer>
      </>
    );
  }
}

export default withStyles(style)(OptionStep);
