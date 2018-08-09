import React, { Component } from "react";
import { Link } from "react-router-dom";

/**
 * Navbar
 */
class Landing extends Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-10">Creation Connection</h1>
                <p className="lead">
                  {" "}
                  Create a profile and portfolio, share posts, and share your
                  skills and knowledge to others
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
