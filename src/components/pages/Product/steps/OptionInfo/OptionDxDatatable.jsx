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
import GridContainer from 'components/theme/Grid/GridContainer.jsx';
import GridItem from 'components/theme/Grid/GridItem.jsx';
import { getEndpoint } from 'helpers/api';

const getChildRows = (row, rootRows) => {
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

const mapOptionsToDataTree = ({ options }) => generateTree(options);

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
    dataRows: [],
    tableColumnExtensions: [{ columnName: 'name', width: 300 }],
    defaultExpandedRowIds: [0],
    selectionIds: []
  };

  componentDidMount = () => {
    const endpoint = getEndpoint('/options');

    fetch(endpoint)
      .then(res => res.json())
      .then(mapOptionsToDataTree)
      .then(dataRows => this.setState({ dataRows }));

    // if (!this.props.allStates.locationState) return;

    // const { allStates } = this.props;
    // if (allStates.locationState.pathname === '/admin/config/products/edit') {

    // }
  };

  handleSelectionChange = selection => {
    if (selection.length < 0) return;
    const { dataRows } = this.state;
    console.log('selection', selection);
    const rows = selection.map(rowId => ({
      ...dataRows[rowId],
      optionIndex: dataRows[rowId].parentId
        ? _.indexOf(
            dataRows,
            dataRows.find(d => d.id === dataRows[rowId].parentId)
          )
        : -1
    }));

    const optionIds = rows
      .filter(option => option.parentId)
      .map(option => option.optionIndex);
    const newOptionIds = _.uniq(optionIds);
    const selectionIds = _.uniq([...selection, ...newOptionIds]);
    this.setState({
      selectionIds: selectionIds
    });
  };

  sendState() {
    // retornar os itens selecionados
    const { dataRows, selectionIds } = this.state;
    if (!dataRows) return this.state;
    const options = selectionIds.map(rowId => dataRows[rowId]);
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
      dataRows,
      columns,
      selectionIds,
      defaultExpandedRowIds,
      tableColumnExtensions
    } = this.state;
    // const { classes } = this.props;
    return (
      <>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12}>
            <Paper>
              <Grid rows={dataRows} columns={columns}>
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
