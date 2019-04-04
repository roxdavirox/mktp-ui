import React from "react";
import CustomMUIDataTable from "./MuiDatatables";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CustomLoadingSkeleton from "components/LoadingSkeleton/CustomLoadingSkeleton.jsx";

import { fetchPricesRangeBegin } from "../../redux/actions/pricesRange.actions";

class PriceTableMuiDatatable extends React.Component {
  state = {
    columns: [
      {
        name: "name",
        label: "Nome",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "idPriceRange",
        options: {
          display: "excluded",
          sort: false,
          filter: false
        }
      }
    ],
    options: {
      filterType: "checkbox",
      textLabels: {
        body: {
          noMatch: <CustomLoadingSkeleton />
        }
      }
    }
  };

  componentDidMount = ({ fetchPricesRangeBegin }) => {
    fetchPricesRangeBegin();
  };

  render = () => {
    const { data } = this.props;
    const { columns, options } = this.state;

    return (
      <CustomMUIDataTable data={data} columns={columns} options={options} />
    );
  };
}

PriceTableMuiDatatable.propTypes = {
  data: PropTypes.any.isRequired,
  fetchPricesRangeBegin: PropTypes.any.isRequired
};

const mapStateToProps = store => ({
  data: store.pricesRangeState.pricesRange
});

export default connect(
  mapStateToProps,
  { fetchPricesRangeBegin }
)(PriceTableMuiDatatable);
