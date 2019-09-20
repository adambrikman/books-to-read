import React from "react";

const LoadingScreen = () => {
  return (
    <div className="container">
      <div className="loading-screen">
        <i className="fa fa-refresh fa-spin"></i>
      </div>
      <h3 className="load-msg">Loading data from the server</h3>
    </div>
  );
};

export default LoadingScreen;
