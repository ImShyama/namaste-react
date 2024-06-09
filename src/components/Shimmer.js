import React from "react";

const ShimmerElement = () => {
    return(
        <div className="card">
    <div className="shimmerBG media"></div>
    <div className="p-32">
      <div className="shimmerBG title-line"></div>
      <div className="shimmerBG title-line end"></div>

      <div className="shimmerBG content-line m-t-24"></div>
      <div className="shimmerBG content-line"></div>
      <div className="shimmerBG content-line"></div>
      <div className="shimmerBG content-line"></div>
      <div className="shimmerBG content-line end"></div>
    </div>
  </div>
    )
  
};

const Shimmer = () => {
  const shimmerCount = 15;
  const shimmerElements = Array.from({ length: shimmerCount }, (_, index) => (
    <ShimmerElement key={index} />
  ));

  return <div className="shimmer_container">{shimmerElements}</div>;
};

export default Shimmer;
