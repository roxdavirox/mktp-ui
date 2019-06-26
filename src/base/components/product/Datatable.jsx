import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MuiDatatable from 'base/components/common/tables/MuiDatatable';
import MoreHorizIcon from 'base/components/common/icons/MoreHorizIcon.jsx';
import { AddToolbar } from 'base/components/common/tables/Toolbar.jsx';
import Loading from './LoadingSkeleton';

const styles = {
  EditCell: { textAlign: 'right' },
  NameCell: { fontWeight: 500 }
};

class Datatable extends React.Component {
  handleRowsDelete = rows => {
    // const { enqueueSnackbar, data } = this.props;

    // const { data: dataRows } = rows;

    // const indexRows = dataRows.map(({ dataIndex }) => dataIndex);

    // const priceTableIds = indexRows.map(index => data[index]._id);

    // enqueueSnackbar('Deletando...', {
    //   variant: 'info',
    //   autoHideDuration: 2000
    // });

    // this.props.deletePriceTables(priceTableIds, enqueueSnackbar);
  };

  render = () => {
    const { data } = this.props;
    const columns = [
      {
        name: 'name',
        label: 'Name',
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: '_id',
        label: 'Id',
        options: {
          sort: false,
          filter: false
        }
      }
    ];
    const options = {
      filterType: 'checkbox',
      download: false,
      print: false,
      filter: false,
      viewColumns: false,
      rowHover: false,
      textLabels: {
        body: {
          noMatch: <Loading />
        }
      }
    };

    return (
      <MuiDatatable
        title={'Lista de produtos'}
        data={data}
        columns={columns}
        options={options}
      />
    );
  };
}

Datatable.propTypes = {
  data: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Datatable);
