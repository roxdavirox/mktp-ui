/* eslint-disable react/display-name */
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const CustomLoadingSkeleton = ({ isLoading }) =>
  isLoading ? (
    <div style={{ fontSize: 25, lineHeight: 2 }}>
      <Skeleton count={8} height={50} />
    </div>
  ) : (
    'Nenhuma opção'
  );

CustomLoadingSkeleton.propTypes = {
  isLoading: PropTypes.any.isRequired
};

export default () => {
  const isLoading = useSelector(state => state.options.isLoading);
  return <CustomLoadingSkeleton isLoading={isLoading} />;
};
