import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../actions/auth';

import '../App.css';

function Nav({auth: {isAuthenticated, loading}, logout}){
    const authLinks = (
            <ul className="nav-link">
                <Link className="link" to="/">
                    <li onClick={logout}>Logout</li>
                </Link>
            </ul>
    );

    const guestLinks = (
            <ul className="nav-link">
                <Link className="link"  to="/signup">
                    <li >Sign Up</li>
                </Link>
                <Link className="link" to="/login">
                    <li >Login</li>
                </Link>
            </ul>
    );

    return(
        <nav class="navbar bg-dark">
            <h1>Covid Tracker</h1>
            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks} </Fragment>)}
        </nav>
    );
}

Nav.propTypes = {
    logout:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Nav);