import React from 'react';
import {Link} from 'react-router-dom';

import '../App.css';

function Landing(){
    return(
        <div>
            <section className="landing">
                <div class="dark-overlay">
                    <div class="landing-inner">
                        <h1 className="x-large">Covid Tracker</h1>
                        <div className="buttons">
                            <Link to="/signup">
                                <button className="btn btn-primary">Sign up</button> 
                            </Link>
                            <Link to="/login">
                                <button className="btn btn-light">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Landing;