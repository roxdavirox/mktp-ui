import React from "react";
import Skeleton from "react-loading-skeleton";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PricesRangeLoadingSkeleton = ({ isLoading }) =>
  isLoading ? (
    <div style={{ fontSize: 25, lineHeight: 2 }}>
      <Skeleton count={8} height={50} />
    </div>
  ) : (
    "Nenhuma tabela de preço"
  );

const mapStateToProps = store => ({
  isLoading: store.pricesRange.loading
});

PricesRangeLoadingSkeleton.propTypes = {
  isLoading: PropTypes.any.isRequired
};

export default connect(mapStateToProps)(PricesRangeLoadingSkeleton);
