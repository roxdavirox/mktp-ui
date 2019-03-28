import React from "react";
import Skeleton from "react-loading-skeleton";

const CustomLoadingSkeleton = () => (
  <div style={{ fontSize: 25, lineHeight: 2 }}>
    <Skeleton count={10} height={50} />
  </div>
);

export default CustomLoadingSkeleton;
