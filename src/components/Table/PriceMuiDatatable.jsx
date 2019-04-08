import React from "react";
import CustomMUIDataTable from "./MuiDatatable";
import { connect } from "react-redux";

class PriceMuiDatatable extends React.Component {
  render = () => {
    const { idPriceRange } = this.props;
    return <h1>Id: {idPriceRange}</h1>;
  };
}

const mapStateToProps = store => {
  return {
    idPriceRange: store.priceState.idPriceRange
  };
};

export default connect(mapStateToProps)(PriceMuiDatatable);
