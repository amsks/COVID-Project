import React from "react";
import { PropTypes } from "prop-types";

const Button = ({ children }) => (
    <button className="btn btn-space waves-effect text-center m-b-20">
    {children}
    </button> 
);

Button.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Button;
