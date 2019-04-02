import React from "react";
import Skeleton from "react-loading-skeleton";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ItemLoadingSkeleton = ({ isLoading }) =>
  isLoading ? (
    <div style={{ fontSize: 22, lineHeight: 2 }}>
      <Skeleton count={3} height={32} />
    </div>
  ) : (
    "Nenhum item"
  );

const mapStateToProps = store => ({ isLoading: store.itemsState.loading });

ItemLoadingSkeleton.propTypes = {
  isLoading: PropTypes.any.isRequired
};

export default connect(mapStateToProps)(ItemLoadingSkeleton);
