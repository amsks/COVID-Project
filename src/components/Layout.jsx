import React from "react";
import { PropTypes } from "prop-types";
import Navigation from "./Navigation";
import Footer from "./Footer";

const Layout = ({ children }) => (
    // <div>
    <>
        <Navigation />
        {children}
    </>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;