import React from "react";
import Skeleton from "react-loading-skeleton";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const CustomLoadingSkeleton = ({ isLoading }) =>
  isLoading ? (
    <div style={{ fontSize: 25, lineHeight: 2 }}>
      <Skeleton count={8} height={50} />
    </div>
  ) : (
    "Nenhuma opção"
  );

const mapStateToProps = store => ({ isLoading: store.options.loading });

CustomLoadingSkeleton.propTypes = {
  isLoading: PropTypes.any.isRequired
};

export default connect(mapStateToProps)(CustomLoadingSkeleton);
