import React from "react";
import Skeleton from "react-loading-skeleton";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PriceLoadingSkeleton = ({ isLoading }) =>
  isLoading ? (
    <div style={{ fontSize: 25, lineHeight: 2 }}>
      <Skeleton count={8} height={50} />
    </div>
  ) : (
    "Nenhuma preço cadastrado"
  );

const mapStateToProps = store => ({
  isLoading: store.prices.loading
});

PriceLoadingSkeleton.propTypes = {
  isLoading: PropTypes.any.isRequired
};

export default connect(mapStateToProps)(PriceLoadingSkeleton);
