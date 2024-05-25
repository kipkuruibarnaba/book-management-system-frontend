import React from "react";
import Spinner from "react-bootstrap/Spinner";
function Loading() {
  return (
    <div>
      <div className="col-md-8 offset-sm-2 mt-2">
        <div className="card">
          <div className="card-header">
            <h4>Loading Wait . . .</h4>
          </div>
          <div className="card-body">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Loading;
