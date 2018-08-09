import React, { Component } from "react";

/**
 * Navbar
 */
class Footer extends Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <footer className="bg-dark text-white mt-5 p-4 text-center">
          Copyright {new Date().getFullYear()} Nathan Brake
        </footer>
      </div>
    );
  }
}

export default Footer;
