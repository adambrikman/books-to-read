import React from "react";

const LoadingScreen = () => {
  return (
    <div>
      <div className="loading-screen">
        <i className="fa fa-refresh fa-spin"></i>
      </div>
      <h1 className="load-msg">Loading data from the server</h1>
    </div>
  );
};

export default LoadingScreen;
