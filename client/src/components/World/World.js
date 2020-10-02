import React from 'react';
import './world.css';

function World({total, recovered, deaths}){

    return(
        <div className="world-card">
            <h4>World</h4>
            <div className="inner-items">
                <div className="item recovered">
                    <p>Recovered</p>
                    <h4>{parseInt(recovered)}</h4>
                </div>
                <div className="item deaths">
                    <p>Deaths</p>
                    <h4>{parseInt(deaths)}</h4>
                </div>
                <div className="item total">
                    <p>Total</p>
                    <h4>{parseInt(total)}</h4>
                </div>
            </div>
        </div>
    );
}

export default World;