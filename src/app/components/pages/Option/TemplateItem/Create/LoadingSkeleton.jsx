/* eslint-disable react/display-name */
import React, { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';

const CustomLoadingSkeleton = ({ isLoading }) =>
  isLoading ? (
    <div style={{ fontSize: 25, lineHeight: 2 }}>
      <Skeleton count={8} height={50} />
    </div>
  ) : (
    'Nenhuma informação encontrada'
  );

CustomLoadingSkeleton.propTypes = {
  isLoading: PropTypes.any.isRequired
};

export default memo(CustomLoadingSkeleton);
