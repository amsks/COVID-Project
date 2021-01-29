import React from "react";
import { Link, withRouter } from "react-router-dom";
import store from "store";

function Navigation(props) {
    return (
    <div className="navigation">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
            {/* <div className="container"> */}
                <Link className="navbar-brand" to="/" style={{margin:'1% 5%'}}>
                    COVT : COVID-19 Data Simplified
                </Link>
                <button className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive" style={{margin:'1% 5%'}}>
                    <ul className="navbar-nav ml-auto">
                        {store.get("authorised") ? (
                        <li>
                            <Link className="nav-link" to="/" onClick={() => store.set("authorised", false)}>
                                Logout
                            </Link>
                        </li>
                        ) : (
                        <>
                        <li className={`nav-item  ${props.location.pathname === "/" ? "active" : "" }`}>
                            <Link className="nav-link" to="/">
                                Home
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        </>
                        )}
                        <li className={`nav-item  ${props.location.pathname === "/about" ? "active" : ""}`}>
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>
                        <li className={`nav-item  ${props.location.pathname === "/contact" ? "active" : ""}`}>
                            <Link className="nav-link" to="/contact">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            {/* </div> */}
        </nav>
    </div>
    );
}

export default withRouter(Navigation);